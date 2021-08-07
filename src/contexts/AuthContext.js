import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../components/Firebase";

const AuthContext = React.createContext();
export const useAuth = () =>  useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [User, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((User) => {
      setUser(User);
      setLoading(false);
      if (User) {
        history.push("/chats");
      }
    });
  }, [User, history]);
  const value =  User ;
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
