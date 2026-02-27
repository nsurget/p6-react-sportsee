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

    return {
        firstName: rawData.profile.firstName || 'Unknown',
        lastName: rawData.profile.lastName || 'User',
        age: rawData.profile.age || 0,
        weight: rawData.profile.weight || 0,
        height: rawData.profile.height || 0,
        profilePicture: rawData.profile.profilePicture || '',
        createdAt: formattedDate,
        stats: {
            distance: parseFloat(rawData.statistics?.totalDistance || 0),
            sessions: parseInt(rawData.statistics?.totalSessions || 0),
            duration: parseInt(rawData.statistics?.totalDuration || 0)
        }
    };
}

