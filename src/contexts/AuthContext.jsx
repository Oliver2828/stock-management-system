import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../Api/Api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token,   setToken]   = useState(() => localStorage.getItem('token'));
  const [role,    setRole]    = useState(() => localStorage.getItem('role'));
  const [loading, setLoading] = useState(false);

  // Whenever token or role changes, persist & set default header
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }, [token, role]);

  // login against your backend
  const login = async (email, password) => {
    setLoading(true);
    try {
      // POST to http://localhost:5000/api/auth/login
      const { data } = await api.post('/api/auth/login', { email, password });
      // { token, role }
      setToken(data.token);
      setRole(data.role);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // clear out auth state
  const logout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
