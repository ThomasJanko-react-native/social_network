import React, { createContext, useState, useEffect } from 'react';
import userService from '../services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export const Context = createContext();

const ContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAuth, setUserAuth] = useState(null);
  const [token, setToken] = useState(null);
  const [loader, setLoader] = useState(false);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    
    let jwt = AsyncStorage.getItem('token')
    .then(res => {
      setToken(res)
      // console.log(token)
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


  messaging().onMessage(remoteMessage =>
    onDisplayNotification(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    ),
  );
  messaging().setBackgroundMessageHandler(remoteMessage =>
    onDisplayNotification(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    ),
  );

  const onDisplayNotification = async (title, body) => {
    try {
      // Display a notification
      await notifee.displayNotification({
        title: title,
        body: body,
        android: {
          channelId: 'default',
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (err) {
      toast.show(err.message, {type: 'warning'});
    }
  };
  const initNotification = async () => {
    try {
      // Register the device with FCM
      await messaging().registerDeviceForRemoteMessages();

      // Get the token
      const token = await messaging().getToken();

      // Save the token
      await AsyncStorage.setItem('fcm_token', JSON.stringify(token));


      // required for iOS
      await notifee.requestPermission();

      // required for Android
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
    } catch (err) {
      toast.show(err.message, {type: 'warning'});
    }
  };

  return (
    <Context.Provider value={{ 
        userAuth,
        isAuthenticated,
        setUserAuth,
        login,
        logout,
        loader,
        setLoader,
        reload,
        setReload,
        initNotification,
        onDisplayNotification
        }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
