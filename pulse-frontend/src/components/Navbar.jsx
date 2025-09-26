import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Button} from '@/components/ui/button'
import {useAuth} from '@/contexts/AuthContext'

// --- Exported

export function Navbar() {
    const {logout, user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        logout();
        navigate('/auth/sign-in');
    };

    const isActive = (path) => location.pathname === path;
    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`text-lg font-semibold ${
                                isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                            } transition-colors`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/dashboard"
                            className={`text-lg font-semibold ${
                                isActive('/dashboard') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                            } transition-colors`}
                        >
                            Dashboard
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user?.email && (
                            <span className="text-sm text-gray-600">
                Welcome, {user.email}
              </span>
                        )}
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}