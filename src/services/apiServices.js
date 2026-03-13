import { API_BASE_URL } from '../config';
import { mockUserInfo, mockUserActivity, mockUsers } from './mockData';

/**
 * Perform a generic fetch call with error handling.
 */
async function apiCall(endpoint, options = {}) {
    try {

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            let errorData = {};
            try {
                errorData = await response.json();
            } catch (e) {
                // If the response is not JSON, ignore
            }

            if (response.status === 401) {
                throw new Error(errorData.message || "Votre session est invalide ou a expiré. Veuillez vous reconnecter.");
            } else if (response.status === 404) {
                throw new Error("Les données demandées sont introuvables.");
            } else if (response.status >= 500) {
                throw new Error("Le serveur est actuellement indisponible. Veuillez réessayer plus tard.");
            }

            throw new Error(errorData.message || "Une erreur est survenue lors de la récupération des données.");
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            throw new Error("Impossible de contacter le serveur. Veuillez vérifier votre connexion ou réessayer plus tard.");
        }
        throw error;
    }
}

/**
 * Logs a user in using the backend local API
 */
export async function loginUser(username, password) {
    if (import.meta.env.VITE_USE_MOCK_DATA == 'true') {
        await mockDelay(1000);
        const user = mockUsers.find(u => u.username === username && u.password === password);
        
        if (!user) {
            throw new Error("Identifiants de test invalides.");
        }

        return {
            userId: user.userId,
            token: user.token
        };
    }

    // According to brief: { "username": "sophiemartin", "password": "password123" }
    return apiCall('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
}

/**
 * Helper to simulate network delay for mock data
 */
async function mockDelay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetches the user info and statistics from the API
 */
export async function fetchUserInfo() {
    if (import.meta.env.VITE_USE_MOCK_DATA == 'true') {
        
        await mockDelay();
        return mockUserInfo;
    }

    // Pass auth token if backend requires it. For now, just call the endpoint.
    // The brief says: http://localhost:8000/api/user-info
    return apiCall('/user-info', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

/**
 * Fetches the user activity between two dates from the API
 */
export async function fetchUserActivity(startWeek, endWeek) {
    if (import.meta.env.VITE_USE_MOCK_DATA == 'true') {
        await mockDelay();
        const start = new Date(startWeek);
        const end = new Date(endWeek);

        // Ensure inclusive end date matching by putting time to end of day
        end.setHours(23, 59, 59, 999);

        const filteredActivities = mockUserActivity.filter(activity => {
            const activityDate = new Date(activity.date);
            return activityDate >= start && activityDate <= end;
        });

        return filteredActivities;
    }

    return apiCall(`/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
}
