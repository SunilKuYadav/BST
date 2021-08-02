import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import AuthNavigator from './app/navigation/AuthNavigator';
import AuthContext from "./app/auth/context";
import AppNavigator from "./app/navigation/AppNavigator";
import authStorage from './app/auth/storage';

export default function App() {
  const [user, setUser] = useState();

  const restoreUser = async () =>{
  const user = await authStorage.getUser();
  if (user) setUser(user);
  }


  return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer>
      { user ? <AppNavigator/> : <AuthNavigator/>}
      </NavigationContainer>
    </AuthContext.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
