import {Navbar} from '@/components/Navbar';
import {useAuth} from '@/contexts/AuthContext';
import {Alert, AlertDescription} from '@/components/ui/alert';

// --- Exported

export function Home() {
    const {user} = useAuth();
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Welcome to pulse!
                    </h1>

                    <Alert className="mb-6 border-green-200 bg-green-50">
                        <AlertDescription className="text-green-800">
                            Logged in as: <strong>{user?.email}</strong>
                        </AlertDescription>
                    </Alert>

                    <div className="prose max-w-none">
                        <p className="text-gray-600 text-lg mb-4">
                            You've successfully authenticated and can now access all protected features of the
                            application.
                        </p>

                        <div className="mt-8 grid gap-6 md:grid-cols-2">
                            <div className="bg-blue-50 rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-blue-900 mb-2">
                                    Getting Started
                                </h2>
                                <p className="text-blue-700">
                                    Explore the dashboard to see your personalized content and manage your account
                                    settings.
                                </p>
                            </div>

                            <div className="bg-purple-50 rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-purple-900 mb-2">
                                    Need Help?
                                </h2>
                                <p className="text-purple-700">
                                    Check out our documentation or contact support if you need any assistance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}