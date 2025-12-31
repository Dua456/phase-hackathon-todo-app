'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get token and provider from URL parameters
        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search);
          const token = urlParams.get('token');
          const provider = urlParams.get('provider');
          const errorParam = urlParams.get('error');

          if (errorParam) {
            // Handle OAuth error
            setError(`Authentication failed: ${decodeURIComponent(errorParam)}`);
            setLoading(false);
            return;
          }

          if (!token) {
            setError('No token received from authentication provider');
            setLoading(false);
            return;
          }

          console.log('Received token:', token?.substring(0, 20) + '...');
          console.log('Received provider:', provider);

          // Store the token and provider in localStorage first
          localStorage.setItem('token', token);

          if (provider) {
            localStorage.setItem('authProvider', provider);
            console.log('Provider stored in localStorage:', provider);
          }

          // Small delay to ensure data is stored before redirect
          await new Promise(resolve => setTimeout(resolve, 300));

          // Redirect to dashboard or main app
          console.log('Authentication successful, redirecting to dashboard...');
          // Use window.location for more reliable redirect
          window.location.href = '/dashboard';
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('An error occurred during authentication');
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [router, login]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin mx-auto text-4xl text-white mb-4" />
          <p className="text-xl text-white">Completing authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
          <div className="text-center">
            <div className="text-red-400 text-2xl mb-4">✗</div>
            <h2 className="text-2xl font-bold text-white mb-2">Authentication Error</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null; // This should not be reached if redirect works
}