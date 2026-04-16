import { useState, useEffect, useCallback } from 'react';
import { cryptoAPI } from '../services/api';

export const useCrypto = () => {
  const [cryptos, setCryptos] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [newListings, setNewListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAllCrypto = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await cryptoAPI.getAllCrypto();
      if (response.success) {
        setCryptos(response.data);
        return response.data;
      }
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchGainers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await cryptoAPI.getGainers();
      if (response.success) {
        setGainers(response.data);
        return response.data;
      }
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNewListings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await cryptoAPI.getNewListings();
      if (response.success) {
        setNewListings(response.data);
        return response.data;
      }
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const addCrypto = useCallback(async (cryptoData) => {
    try {
      const response = await cryptoAPI.addCrypto(cryptoData);
      if (response.success) {
        setCryptos((prev) => [response.data, ...prev]);
        return response.data;
      }
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  return {
    cryptos,
    gainers,
    newListings,
    loading,
    error,
    fetchAllCrypto,
    fetchGainers,
    fetchNewListings,
    addCrypto,
  };
};
