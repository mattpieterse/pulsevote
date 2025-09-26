import {createContext, useContext, useState, useEffect, useMemo} from 'react';
import axios from 'axios';

// --- Internal

const AuthContext = createContext(null);

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- Exported

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within the AuthContext');
    }

    return context;
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [failure, setFailure] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setUser({token});
        }

        setLoading(false);
    }, []);

    // - Functions

    const signIn = async (email, password) => {
        try {
            setFailure(null);
            const response = await apiClient.post('/auth/signIn', {
                email,
                password
            });

            localStorage.setItem("authToken", response.data.token);
            setUser({token: response.data.token, email});
            return {
                success: true
            };
        } catch (e) {
            console.error(e);
            setFailure(e.message);
            return {
                success: false,
                message: e.message,
            };
        }
    };

    const signUp = async (email, password) => {
        try {
            setFailure(null);
            const response = await apiClient.post('/auth/signUp', {
                email,
                password
            });

            localStorage.setItem("authToken", response.data.token);
            setUser({token: response.data.token, email});
            return {
                success: true
            };
        } catch (e) {
            console.error(e);
            setFailure(e.message);
            return {
                success: false,
                message: e.message,
            }
        }
    };

    const logout = () => {
        setFailure(null);
        localStorage.removeItem("authToken");
        setUser(null);
    };

    // - Finalize

    const value = useMemo(() => ({
        user,
        signIn,
        signUp,
        logout,
        loading,
        failure,
        isAuthenticated: !!user,
    }), [
        user,
        signIn,
        signUp,
        logout,
        loading,
        failure
    ]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};