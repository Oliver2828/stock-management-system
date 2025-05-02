// src/pages/CreateWorker.jsx
import React, { useState } from 'react';
import api from '../../Api/Api';
import { useAuth } from '../../contexts/AuthContext';

export default function CreateWorker() {
  const { role } = useAuth();
  const [email, setEmail]     = useState('');
  const [password, setPassword]= useState('');
  const [msg, setMsg]         = useState(null);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg(null);
    setError(null);
    setLoading(true);
    try {
      const res = await api.post('/api/auth/create-worker', { email, password });
      setMsg(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (role !== 'owner') {
    return <p>Access denied. Only owners can create workers.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Worker</h2>
      {msg && <div className="p-2 mb-4 bg-green-100 text-green-700">{msg}</div>}
      {error && <div className="p-2 mb-4 bg-red-100 text-red-700">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Email</label>
          <input
            type="email" required
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
            type="password" required
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Creating…' : 'Create Worker'}
        </button>
      </form>
    </div>
  );
}
