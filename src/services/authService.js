import api from '../api/axios';
import { jwtDecode } from "jwt-decode";

const login = async (email, password) => {
    const response = await api.post('/login', `username=${email}&password=${password}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
};

const register = async (email, fullName, password, isAdmin) => {
    const response = await api.post('/register', {
        email,
        full_name: fullName,
        password,
        is_admin: isAdmin
    });
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < Date.now()) {
                logout();
                return null;
            }
            return { email: decoded.sub, is_admin: decoded.is_admin };
        } catch (error) {
            return null;
        }
    }
    return null;
};

export default {
    login,
    register,
    logout,
    getCurrentUser
};
