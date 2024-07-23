import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Loading, CustomTextInput, CustomButton } from '../components';
import { setIsLoading, login, autoLogin } from '../redux/userSlice';

const LoginPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Kullanici daha once giris yaptiysa kontrol et ve otomatik giris yap
  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>

      <Image
        source={require('../assets/images/password_2665311.png')}
        style={styles.image}
      />

      <CustomTextInput
        title="Email"
        isSecureText={false}
        handleOnChangeText={(text) => setEmail(text.toLowerCase())}
        handleValue={email}
        handlePlaceholder="Enter Your Email"
      />

      <CustomTextInput
        title="Password"
        isSecureText={true}
        handleOnChangeText={setPassword}
        handleValue={password}
        handlePlaceholder="Enter Your Password"
      />

      <Text>{error}</Text>

      <CustomButton
        buttonText="Login"
        setWidth="80%"
        handleOnPress={() => dispatch(login({ email, password }))}
        buttonColor="blue"
        buttonColorPressed="gray"
      />

      <CustomButton
        buttonText="Sign Up"
        setWidth="30%"
        handleOnPress={() => navigation.navigate('Signup')}
        buttonColor="gray"
        buttonColorPressed="lightgray"
      />

      {isLoading ? (
        <Loading changeIsLoading={() => dispatch(setIsLoading(false))} />
      ) : null}
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcome: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
    color: 'white',
  },
});
