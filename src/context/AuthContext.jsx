import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            await authService.login(email, password);
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);
            return true;
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
    };

    const register = async (email, fullName, password, isAdmin) => {
        try {
            await authService.register(email, fullName, password, isAdmin);
            return true;
        } catch (error) {
            console.error("Registration failed", error);
            return false;
        }
    }

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
