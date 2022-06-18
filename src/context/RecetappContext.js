import React from "react";
// @function  UserContext
export const UserContext = React.createContext({ name: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ name: '', auth: false });

  const login = (name) => {
    setUser((user) => ({
      name: name,
      auth: true,
    }));
  };

  const logout = () => {
    setUser((user) => ({
      name: '',
      auth: false,
    }));
  };

  const data = { user, login, logout, isAuthenticated: user?.auth };
  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
};