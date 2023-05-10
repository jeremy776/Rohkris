import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  setUser: (user: any) => {},
});
