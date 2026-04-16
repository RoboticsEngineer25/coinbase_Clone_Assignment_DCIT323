import { useState, useCallback } from 'react';
import { authAPI } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!authAPI.getToken());

  const register = useCallback(async (firstName, lastName, email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.register(firstName, lastName, email, password);
      if (response.success) {
        authAPI.setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        authAPI.setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const getProfile = useCallback(async () => {
    try {
      const response = await authAPI.getProfile();
      if (response.success) {
        setUser(response.user);
        return response.user;
      }
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
      authAPI.clearToken();
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    getProfile,
  };
};
