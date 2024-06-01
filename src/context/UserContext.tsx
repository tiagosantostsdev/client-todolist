import { createContext, useState } from "react";

interface typeUser {
  user: any;
  setUser: any;
}

export const UserContext = createContext<typeUser>({
  user: null,
  setUser: null,
});

export default function UserProvider({ children }: Record<string, any>) {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
