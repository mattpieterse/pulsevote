import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {useAuth} from '@/contexts/AuthContext';

// --- Exported

export function SignUp({className, ...props}) {
    const navigate = useNavigate();
    const {signUp} = useAuth();

    const [email, setEmail] = useState('');
    const [defaultPassword, setDefaultPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [failure, setFailure] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFailure(null);

        // - Validation

        if (!email
            || !defaultPassword
            || !confirmPassword
        ) {
            setFailure('Please fill in all fields');
            return;
        }

        if (defaultPassword !== confirmPassword) {
            setFailure('Passwords do not match');
            return;
        }

        if (defaultPassword.length < 6) {
            setFailure('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        // - API Call

        const result = await signUp(email, defaultPassword);
        if (result.success) {
            navigate('/');
        } else {
            setFailure(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <form
                    className={cn("flex flex-col gap-6", className)}
                    {...props}
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Create an account</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Enter your email below to create your account
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
                            <Label htmlFor="defaultPassword">Password</Label>
                            <Input
                                id="defaultPassword"
                                type="defaultPassword"
                                required
                                value={defaultPassword}
                                onChange={(e) => setDefaultPassword(e.target.value)}
                                disabled={loading}
                                placeholder="At least 6 characters"
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="defaultPassword"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={loading}
                                placeholder="Re-enter your defaultPassword"
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </Button>
                    </div>

                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/auth/signIn"
                            className="underline underline-offset-4 text-blue-600 hover:text-blue-800"
                        >
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}