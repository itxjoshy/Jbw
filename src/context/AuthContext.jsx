import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('netflix-clone-profile');
    const savedToken = localStorage.getItem('netflix-clone-token');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedToken) setAuthToken(savedToken);
  }, []);

  useEffect(() => {
    if (profile) localStorage.setItem('netflix-clone-profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (authToken) localStorage.setItem('netflix-clone-token', authToken);
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ profile, setProfile, authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
