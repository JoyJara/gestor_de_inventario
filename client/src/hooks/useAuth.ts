import { useEffect, useState } from "react";

interface AuthState {
  loggedIn: boolean | null;
  user: {
    id: number;
    username: string;
    role: string;
  } | null;
}

export const useAuth = (): AuthState => {
  const [auth, setAuth] = useState<AuthState>({
    loggedIn: null,
    user: null,
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/check-session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAuth({
          loggedIn: data.loggedIn,
          user: data.user || null,
        });
      })
      .catch(() => {
        setAuth({ loggedIn: false, user: null });
      });
  }, []);

  return auth;
};
