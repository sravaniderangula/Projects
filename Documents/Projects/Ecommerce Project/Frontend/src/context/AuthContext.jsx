import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();  
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const loginUser = (userDetails, token) => {
        localStorage.setItem('user', JSON.stringify(userDetails));
        localStorage.setItem('token', token);
        setUser(userDetails);
        setToken(token);
    };

    const logoutUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    const isTokenExpired = () => {
        const token = localStorage.getItem('token');
        if (!token) return true;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.exp * 1000 < Date.now();
        } catch (error) {
            return true;
        }
    };

    return (
        <AuthContext.Provider value={{ loginUser, logoutUser, user, token, isTokenExpired }}>
            {children}
        </AuthContext.Provider>
    );
}
