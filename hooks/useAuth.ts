import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // Mock sign in
    setUser({ id: 'mock-user-1', email });
    setLoading(false);
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setUser({ id: 'mock-user-1', email });
    setLoading(false);
  };

  const signOut = async () => {
    setUser(null);
  };

  return { user, loading, signIn, signUp, signOut };
};
