import { createContext, useEffect, useState } from "react";


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AppContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </AppContext.Provider>
  );
};
