import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {useAuth} from '@/contexts/AuthContext';

// --- Exported

export function SignIn({className, ...props}) {
    const navigate = useNavigate();
    const {signIn} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [failure, setFailure] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFailure(null);

        // - Validation

        if (!email || !password) {
            setFailure('Please fill in all fields');
            return;
        }

        setLoading(true);

        // - API Call

        const result = await signIn(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setFailure(result.failure);
        }

        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <form
                    className={cn("flex flex-col gap-6", className)}
                    {...props}
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Login to your account</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Enter your email below to login to your account
                        </p>
                    </div>

                    {failure && (
                        <Alert variant="destructive">
                            <AlertDescription>{failure}</AlertDescription>
                        </Alert>
                    )}

                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Signing in...' : 'Login'}
                        </Button>
                    </div>

                    <div className="text-center text-sm">
                        Don't have an account?{" "}
                        <Link
                            to="/auth/signUp"
                            className="underline underline-offset-4 text-blue-600 hover:text-blue-800"
                        >
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}