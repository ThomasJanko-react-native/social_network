import React, { useEffect } from 'react';
import { theme } from './src/config/theme'
import { ThemeProvider } from 'styled-components';
import Routes from './src/config/routes';
import ContextProvider from './src/config/context';




function App() {
  // useEffect(() => {
  //   // Initialize Firebase
  //   const firebaseConfig = {
  //     apiKey: "AIzaSyCFvPTNYeX-Sj8AEpjpnp5JwgmU0Ij_8vw",
  //     authDomain: "social-network-solo.firebaseapp.com",
  //     projectId: "social-network-solo",
  //     storageBucket: "social-network-solo.appspot.com",
  //     messagingSenderId: "241065696027",
  //     appId: "1:241065696027:web:e7176092159e53f92c51be",
  //     measurementId: "G-9HGYEZBXX7"
  //   };

  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(firebaseConfig);
  //   }

    // Request user permission to receive push notifications
    // const requestUserPermission = async () => {
    //   const authStatus = await messaging().requestPermission();
    //   const enabled =
    //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //   if (enabled) {
    //     console.log('Authorization status:', authStatus);
    //   }
    // };

    // requestUserPermission();

    // // Handle incoming push notifications when the app is in the foreground
    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   console.log('Received foreground message:', remoteMessage);

    //   const channelId = await notifee.createChannel({
    //     id: 'default',
    //     name: 'Default Channel',
    //   });

    //   await notifee.displayNotification({
    //     title: remoteMessage.notification.title,
    //     body: remoteMessage.notification.body,
    //     android: {
    //       channelId,
    //       smallIcon: 'ic_notification',
    //     },
    //   });
    // });

    // return unsubscribe;
  // }, []);
  
  return (
    <ThemeProvider theme={theme}>
    <ContextProvider>
        <Routes/>
    </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
