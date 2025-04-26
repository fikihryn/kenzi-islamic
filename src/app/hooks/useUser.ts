'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface UserPayload {
  id: number;
  name: string;
  email: string;
  exp: number;
}

export function useUser() {
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    const getUser = () => {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

      if (token) {
        try {
          const decoded = jwtDecode<UserPayload>(token);
          setUser(decoded);
        } catch (err) {
          console.error('Token decoding error', err);
        }
      }
    };

    getUser();
  }, []);

  return user;
}
