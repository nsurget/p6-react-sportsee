/**
 * Formats the raw user data coming from the API into a standard format
 * used by the frontend components.
 */
export function formatUserInfo(rawData) {
    if (!rawData || !rawData.profile) return null;

    const formattedDate = rawData.profile.createdAt
        ? new Date(rawData.profile.createdAt).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '';

    const totalSessions = parseInt(rawData.statistics?.totalSessions || 0);
    const createdAtDate = rawData.profile.createdAt ? new Date(rawData.profile.createdAt) : null;
    
    let restDays = 0;
    if (createdAtDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(createdAtDate);
        start.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(today - start);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        restDays = Math.max(0, diffDays - totalSessions);
    }

    return {
        firstName: rawData.profile.firstName || 'Unknown',
        lastName: rawData.profile.lastName || 'User',
        age: rawData.profile.age || 0,
        weight: rawData.profile.weight || 0,
        height: rawData.profile.height || 0,
        profilePicture: rawData.profile.profilePicture || '',
        createdAt: formattedDate,
        gender: rawData.profile.gender || 'Unknown',
        stats: {
            distance: parseFloat(rawData.statistics?.totalDistance || 0),
            sessions: totalSessions,
            duration: parseInt(rawData.statistics?.totalDuration || 0),
            calories: parseInt(rawData.statistics?.totalCalories || 0),
            restDays: restDays
        }
    };
}

