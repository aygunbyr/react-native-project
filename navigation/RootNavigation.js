import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AuthStack from './AuthStack';
import UserStack from './UserStack';
import app from '../firebaseConfig';
// burada app kullanilmiyor gibi gorunse de uygulama icin gerekli

const RootNavigation = () => {
  const { isAuth } = useSelector((state) => state.user);

  return (
    <NavigationContainer>
      {!isAuth ? <AuthStack /> : <UserStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
