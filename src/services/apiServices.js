import { API_BASE_URL } from '../config';

/**
 * Perform a generic fetch call with error handling.
 */
async function apiCall(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        // If the server returns an error response, throw it to be caught by the hook
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Something went wrong');
    }

    return response.json();
}

/**
 * Logs a user in using the backend local API
 */
export async function loginUser(username, password) {
    // According to brief: { "username": "sophiemartin", "password": "password123" }
    return apiCall('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
}

/**
 * Fetches the user info and statistics from the API
 */
export async function fetchUserInfo() {
    // Pass auth token if backend requires it. For now, just call the endpoint.
    // The brief says: http://localhost:8000/api/user-info
    return apiCall('/user-info');
}
