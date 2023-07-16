
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const navigate = useNavigate();
    // const token = localStorage.getItem('token');
    // console.log(token)
    const token = true

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);
}