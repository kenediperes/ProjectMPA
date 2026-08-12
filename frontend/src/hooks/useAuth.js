import { useAuth as useAuthContext } from '../contexts';

/**
 * Hook that provides authentication state and methods.
 * Usage: const { user, login, logout, isAuthenticated } = useAuth();
 */
export const useAuth = () => {
  return useAuthContext();
};