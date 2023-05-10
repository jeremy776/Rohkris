import React from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function useAuthentication() {
  const [user, setUser] = React.useState<User | null>();

  React.useEffect(() => {
    const unsubs = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubs();
  }, []);

  return user;
}
