import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/auth/signup', { name, email, password });
            login(response.data);
            toast.success('Account created successfully');
            navigate('/', { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-base-200 flex items-center justify-center px-4 py-8'>
            <div className='card bg-base-100 w-full max-w-md'>
                <div className='card-body'>
                    <h1 className='card-title text-2xl'>Create your ThinkBoard account</h1>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='form-control'>
                            <label className='label' htmlFor='signup-name'>Name</label>
                            <input id='signup-name' type='text' className='input input-bordered' value={name} onChange={(event) => setName(event.target.value)} required />
                        </div>
                        <div className='form-control'>
                            <label className='label' htmlFor='signup-email'>Email</label>
                            <input id='signup-email' type='email' className='input input-bordered' value={email} onChange={(event) => setEmail(event.target.value)} required />
                        </div>
                        <div className='form-control'>
                            <label className='label' htmlFor='signup-password'>Password</label>
                            <input id='signup-password' type='password' minLength='6' className='input input-bordered' value={password} onChange={(event) => setPassword(event.target.value)} required />
                        </div>
                        <button type='submit' className='btn btn-primary w-full' disabled={loading}>
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </form>
                    <p className='text-center text-sm'>
                        Already have an account? <Link to='/login' className='link link-primary'>Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
