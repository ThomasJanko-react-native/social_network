import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';

import styled from 'styled-components'

import AsyncStorage from '@react-native-async-storage/async-storage';
import PostsScreen from '../screens/PostsScreen';
import { SafeAreaView } from 'react-native';
import AddPostScreen from '../screens/AddPostScreen';
import { Context } from './context';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();


function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="LoginScreen"
        options={{
          headerTitle: 'Auth',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
        }}
        component={LoginScreen}
      />
    </AuthStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostsScreen" options={{headerShown: false, headerTitleAlign: 'center', headerTintColor: 'blue',}} component={PostsScreen} />
      <Stack.Screen name="AddPostScreen" options={{headerTitle: 'add Post', headerShown: true, headerTitleAlign: 'center', headerTintColor: 'blue',}} component={AddPostScreen} />
      <Stack.Screen name="LoginScreen"  options={{
          headerTitle: 'Auth',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
        }} component={LoginScreen} />
    </Stack.Navigator>
  );
}

function Routes() {

  const {isAuthenticated, userAuth} = useContext(Context)
  useEffect(() => {
    console.log(userAuth)
  }, [])
  

  return (
    <GlobalSafeAreaView>
    <NavigationContainer>
      {userAuth ? (
        <MainNavigator />
      ) : (
        <Stack.Navigator >
          <Stack.Screen name="AuthNavigator" options={{headerShown: false}} component={AuthNavigator} />
        </Stack.Navigator>
      )}
        {/* <Stack.Navigator >
         <Stack.Screen name="PostsScreen" options={{headerShown: false, headerTitleAlign: 'center', headerTintColor: 'blue',}} component={PostsScreen} />
        </Stack.Navigator> */}
    </NavigationContainer>
  </GlobalSafeAreaView>

   
  );
}

const GlobalSafeAreaView = styled.SafeAreaView`
flex: 1;
`

export default Routes;
