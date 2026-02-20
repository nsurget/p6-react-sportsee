import { useState, useEffect } from 'react';
import { fetchUserInfo } from '../services/apiServices';
import { mockUserInfo } from '../services/mockData';
import { formatUserInfo } from '../services/dataFormatter';

/**
 * Custom hook to fetch user info.
 * @param {boolean} useMock - Flag to determine if mock data should be used.
 */
export function useUserInfo() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                setError(null);

                let rawData;
                rawData = await fetchUserInfo();
                const formattedData = formatUserInfo(rawData);
                setData(formattedData);
            } catch (err) {
                setError(err.message || 'Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        }

        loadData();
    });

    return { data, loading, error };
}
