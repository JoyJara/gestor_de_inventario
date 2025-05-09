import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/check-session', {
          credentials: 'include',
        });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    check();
  }, []); // <- si aquí agregas dependencias, lo puedes forzar a recargar

  return isLoggedIn;
};
