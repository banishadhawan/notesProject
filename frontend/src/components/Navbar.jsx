import { LogOutIcon, PlusIcon } from 'lucide-react'
import { Link, useNavigate } from "react-router"
import React from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

  return (
    <header className='bg-base-300 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>ThinkBoard</h1>
                <div className='flex items-center gap-4'>
                    <Link to={"/create"} className="btn btn-primary">
                        <PlusIcon className='size-5'/>
                        <span>New Note</span>
                    </Link>
                    <button type='button' onClick={handleLogout} className='btn btn-ghost' title={`Log out ${user?.name || ''}`}>
                        <LogOutIcon className='size-5' />
                        <span>Log out</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar