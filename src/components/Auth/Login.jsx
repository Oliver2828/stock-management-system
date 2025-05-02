import React, { useState } from 'react';
import { useAuth }       from '../../contexts/AuthContext';
import { useNavigate }   from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';

export default function Login({ showNotification }) {
  const [email,      setEmail]     = useState('');
  const [password,   setPassword]  = useState('');
  const [error,      setError]     = useState('');
  const [submitting, setSubmitting]= useState(false);
  const { login }                 = useAuth();
  const navigate                  = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      showNotification('Logged in successfully');
      navigate('/');
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || 'Login failed';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">SuperStock</h1>
          <p className="text-gray-600">Inventory Management System</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded flex items-center gap-3 text-red-700">
              <FiAlertCircle /><span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email" required
                className="w-full border px-3 py-2 rounded"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={submitting}
              />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password" required
                className="w-full border px-3 py-2 rounded"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={submitting}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-2 rounded text-white ${
                submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {submitting ? 'Signing In…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
