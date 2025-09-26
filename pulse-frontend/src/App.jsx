import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider, useAuth} from '@/contexts/AuthContext';
import {AuthenticatedRoute} from '@/components/AuthenticatedRoute.jsx';
import {SignIn} from '@/pages/auth/SignIn';
import {SignUp} from '@/pages/auth/SignUp';
import {Home} from '@/pages/Home';
import {Dashboard} from '@/pages/Dashboard';

// --- Internal

function Redirect() {
    const {isAuthenticated, loading} = useAuth();
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        isAuthenticated
            ? <Navigate to="/home" replace/>
            : <Navigate to="/auth/signIn" replace/>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path={"/"} element={<Redirect/>}/>
                    <Route path="/auth/signIn" element={<SignIn/>}/>
                    <Route path="/auth/signUp" element={<SignUp/>}/>

                    {
                        // AUTHENTICATED
                    }
                    <Route
                        path="/home"
                        element={
                            <AuthenticatedRoute>
                                <Home/>
                            </AuthenticatedRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <AuthenticatedRoute>
                                <Dashboard/>
                            </AuthenticatedRoute>
                        }
                    />

                    {
                        // REDIRECT-ALL
                    }
                    <Route
                        path="*"
                        element={
                            <Navigate to="/" replace/>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

// --- Exported

export default App