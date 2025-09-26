import {Navigate} from 'react-router-dom';
import {useAuth} from '@/contexts/AuthContext';

// --- Exported

export function AuthenticatedRoute({children}) {
    const {isAuthenticated, loading} = useAuth();
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate to="/auth/signIn" replace/>
        );
    }

    return children;
}