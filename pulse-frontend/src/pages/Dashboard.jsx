import {Navbar} from '@/components/Navbar';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

// --- Exported

export function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                            <CardDescription>
                                Your account statistics at a glance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Status</span>
                                    <span className="text-sm font-medium text-green-600">Active</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Last Login</span>
                                    <span className="text-sm font-medium">Today</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Your latest actions and updates
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                <li className="text-gray-600">• Logged in successfully</li>
                                <li className="text-gray-600">• Account verified</li>
                                <li className="text-gray-600">• Profile updated</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common tasks and shortcuts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800">
                                    → Update Profile
                                </button>
                                <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800">
                                    → Change Password
                                </button>
                                <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800">
                                    → View Settings
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Welcome to Your Dashboard</h2>
                    <p className="text-gray-600">
                        This is your personal dashboard where you can manage your account,
                        view analytics, and access all the features of the application.
                        Use the navigation bar above to switch between different sections.
                    </p>
                </div>
            </main>
        </div>
    );
}