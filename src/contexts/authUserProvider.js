import React, { useState, useEffect } from "react";
import { setCurrentUser } from "./../commons/user";
import { getUid } from "./../commons/user";
import auth from "@react-native-firebase/auth";

const AuthUserContext = React.createContext();

const AuthUserProvider = (props) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    getUid() ? true : false
  );
  const fetchAuthUser = async () => {
    auth().onAuthStateChanged((user) => {
      setCurrentUser(user || { uid: null });
      setIsAuthenticated(user ? true : false);
      if (user !== null) {
        if (user.email) {
          if (user.displayName) {
            const Name = JSON.parse(user.displayName);
            setFullName(Name.fullName);
            setEmail(user.email);
            setPhone(Name.phone);
          } else {
            setEmail(user.email);
            setFullName("Bienvenido(a)");
          }
        } else if (user.isAnonymous) {
          if (user.displayName) {
            const Name = JSON.parse(user.displayName);
            setFullName(Name.fullName);
            setEmail(null);
          } else {
            setEmail(null);
            setFullName("Bienvenido(a)");
          }
        } else {
          if (user.providerData.length) {
            setEmail(user.providerData[0].email);
            setFullName(user.providerData[0].displayName);
          }
        }
      } else {
        setEmail("");
        setFullName("");
      }
    });
  };

  useEffect(() => {
    fetchAuthUser();
  }, []);

  const updateUser = () => {
    fetchAuthUser();
  };
  return (
    <AuthUserContext.Provider
      value={{
        email,
        fullName,
        phone,
        isAuthenticated,
        updateUser,
      }}
    >
      {props.children}
    </AuthUserContext.Provider>
  );
};

export { AuthUserProvider, AuthUserContext };
