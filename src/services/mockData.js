export const mockUserInfo = {
    "profile": {
        "firstName": "Sophie",
        "lastName": "Martin (Données mockées)",
        "age": 32,
        "gender": "female",
        "profilePicture": "http://localhost:8000/images/sophie.jpg",
        "height": 165,
        "weight": 60,
        "createdAt": "2025-01-01"
    },
    // Données par défaut reconstituées
    "statistics": {
        "totalDistance": 128.8,
        "totalSessions": 21,
        "totalDuration": 863,
        "totalCalories": 9673
    }
};

export const mockUserActivity = [
    { "date": "2026-02-16", "distance": 6.8, "duration": 48, "heartRate": { "min": 140, "max": 178, "average": 163 }, "caloriesBurned": 505 },
    { "date": "2026-02-17", "distance": 4.5, "duration": 30, "heartRate": { "min": 145, "max": 182, "average": 170 }, "caloriesBurned": 340 },
    { "date": "2026-02-18", "distance": 8.1, "duration": 55, "heartRate": { "min": 138, "max": 180, "average": 161 }, "caloriesBurned": 612 },
    { "date": "2026-02-19", "distance": 3.2, "duration": 25, "heartRate": { "min": 142, "max": 175, "average": 165 }, "caloriesBurned": 250 },
    { "date": "2026-02-20", "distance": 5.5, "duration": 40, "heartRate": { "min": 141, "max": 179, "average": 164 }, "caloriesBurned": 420 },
    { "date": "2026-02-21", "distance": 10.0, "duration": 65, "heartRate": { "min": 135, "max": 185, "average": 159 }, "caloriesBurned": 750 },
    { "date": "2026-02-22", "distance": 7.3, "duration": 50, "heartRate": { "min": 139, "max": 176, "average": 162 }, "caloriesBurned": 530 },

    { "date": "2026-02-23", "distance": 6.0, "duration": 45, "heartRate": { "min": 140, "max": 178, "average": 164 }, "caloriesBurned": 450 },
    { "date": "2026-02-24", "distance": 4.2, "duration": 28, "heartRate": { "min": 144, "max": 180, "average": 169 }, "caloriesBurned": 315 },
    { "date": "2026-02-25", "distance": 8.5, "duration": 60, "heartRate": { "min": 137, "max": 179, "average": 160 }, "caloriesBurned": 645 },
    { "date": "2026-02-26", "distance": 5.0, "duration": 35, "heartRate": { "min": 141, "max": 177, "average": 165 }, "caloriesBurned": 380 },
    { "date": "2026-02-27", "distance": 3.8, "duration": 26, "heartRate": { "min": 145, "max": 181, "average": 168 }, "caloriesBurned": 290 },
    { "date": "2026-02-28", "distance": 11.2, "duration": 75, "heartRate": { "min": 134, "max": 184, "average": 158 }, "caloriesBurned": 820 },
    { "date": "2026-03-01", "distance": 6.5, "duration": 46, "heartRate": { "min": 140, "max": 178, "average": 163 }, "caloriesBurned": 485 },

    { "date": "2026-03-02", "distance": 7.0, "duration": 50, "heartRate": { "min": 139, "max": 177, "average": 162 }, "caloriesBurned": 520 },
    { "date": "2026-03-03", "distance": 4.8, "duration": 32, "heartRate": { "min": 143, "max": 180, "average": 167 }, "caloriesBurned": 360 },
    { "date": "2026-03-04", "distance": 9.2, "duration": 62, "heartRate": { "min": 136, "max": 181, "average": 160 }, "caloriesBurned": 690 },
    { "date": "2026-03-05", "distance": 3.5, "duration": 24, "heartRate": { "min": 145, "max": 178, "average": 168 }, "caloriesBurned": 270 },
    { "date": "2026-03-06", "distance": 5.8, "duration": 41, "heartRate": { "min": 140, "max": 179, "average": 164 }, "caloriesBurned": 435 },
    { "date": "2026-03-07", "distance": 12.0, "duration": 80, "heartRate": { "min": 133, "max": 186, "average": 157 }, "caloriesBurned": 890 },
    { "date": "2026-03-08", "distance": 5.2, "duration": 36, "heartRate": { "min": 142, "max": 177, "average": 165 }, "caloriesBurned": 395 },
];

export const mockUsers = [
    {
        userId: "user123",
        username: "sophiemartin",
        password: "password123",
        token: "mock-jwt-token-for-sophie-123"
    }
];
