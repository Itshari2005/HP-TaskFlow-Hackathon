// src/components/OAuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = window.location.href;
    const urlParams = new URLSearchParams(query.split('?')[1]);
    const token = urlParams.get('token');

    console.log('Token from URL:', token);
    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default OAuthSuccess;
