import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data);
            toast.success('Logged in successfully');
            navigate(location.state?.from?.pathname || '/', { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to log in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-base-200 flex items-center justify-center px-4 py-8'>
            <div className='card bg-base-100 w-full max-w-md'>
                <div className='card-body'>
                    <h1 className='card-title text-2xl'>Log in to ThinkBoard</h1>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='form-control'>
                            <label className='label' htmlFor='login-email'>Email</label>
                            <input id='login-email' type='email' className='input input-bordered' value={email} onChange={(event) => setEmail(event.target.value)} required />
                        </div>
                        <div className='form-control'>
                            <label className='label' htmlFor='login-password'>Password</label>
                            <input id='login-password' type='password' className='input input-bordered' value={password} onChange={(event) => setPassword(event.target.value)} required />
                        </div>
                        <button type='submit' className='btn btn-primary w-full' disabled={loading}>
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                    <p className='text-center text-sm'>
                        Need an account? <Link to='/signup' className='link link-primary'>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
