import { useState, useEffect, useCallback } from 'react';
import { getUsers } from '../api/userService';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getUsers();
            const mappedUsers = response.data.map(user => {
                const names = user.name.split(" ");
                return {
                    id: user.id,
                    firstName: names[0] || "",
                    lastName: names.slice(1).join(" ") || "",
                    email: user.email,
                    department: user.company?.name || "Unknown"
                };
            });
            setUsers(mappedUsers);
        } catch (err) {
            setError("Failed to load users. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { users, setUsers, loading, error, fetchUsers };
};
