'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Extract email from token stored in cookie (or fetch from an endpoint)
        // For now, we'll create an endpoint to get user info
        const fetchUserInfo = async () => {
            try {
                const res = await fetch('/api/user', { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    setEmail(data.email);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            setLoading(false);
        }
    };

    return (
        <nav className='bg-gray-50'>
            <div className='max-w-6xl mx-auto px-4 flex justify-between py-3'>
                <div>
                    <span></span>
                </div>
                <div className="flex items-center gap-4">
                    {email && (
                        <span className="text-white text-sm sm:text-base">
                            {email}
                        </span>
                    )}
                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="bg-black disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                        {loading ? 'Saliendo...' : 'Logout'}
                    </button>
                </div>
            </div>
        </nav>
    );
}
