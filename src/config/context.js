import React, { createContext, useState, useEffect } from 'react';
import userService from '../services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Context = createContext();

const ContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAuth, setUserAuth] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    
    let jwt = AsyncStorage.getItem('token')
    .then(res => {
      setToken(res)
    })
   
    console.log('hello', jwt);
    if(token){
      login(token)
    }
  }, []);

  const login = (user) => {
    console.log('Context login')
    // console.log(user)
    userService.getUserAuth(user)
    .then((user) => {
      setIsAuthenticated(true);
      setUserAuth(user.data);
      console.log(user.data)
      
    })
    .catch((error) => {})
  }

  const logout = () => {
    setIsAuthenticated(false);
    setUserAuth(null);
    localStorage.removeItem('token')

  }

  return (
    <Context.Provider value={{ 
        userAuth,
        isAuthenticated,
        setUserAuth,
        login,
        logout,
        }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
