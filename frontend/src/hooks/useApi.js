import { useState, useCallback, useRef, useEffect } from 'react';
import api from '../api';

/**
 * Hook to make API calls with loading and error states.
 * Automatically cancels previous request on new call.
 * @returns {object} - { loading, error, data, request, reset }
 */
export const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const request = useCallback(async (config) => {
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await api({
        ...config,
        signal: controller.signal,
      });
      setData(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
        // Request was cancelled, ignore
        return { success: false, cancelled: true };
      }
      setError(err.response?.data?.message || err.message || 'Request failed');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { loading, error, data, request, reset };
};