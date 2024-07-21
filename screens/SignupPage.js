import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { CustomTextInput, CustomButton } from '../components';

const SignupPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Image
          style={styles.image}
          source={require('../assets/images/add-friend_1144746.png')}
        />
        <Text style={styles.signUp}>Sign Up</Text>
      </View>

      <View style={styles.textInputContainer}>
        <CustomTextInput
          title="Name"
          isSecureText={false}
          handleOnChangeText={setName}
          handleValue={name}
          handlePlaceholder="Enter Your Name"
        />

        <CustomTextInput
          title="Email"
          isSecureText={false}
          handleOnChangeText={setEmail}
          handleValue={email}
          handlePlaceholder="Enter Your Email"
        />

        <CustomTextInput
          title="Password"
          isSecureText={true}
          handleOnChangeText={setPassword}
          handleValue={password}
          handlePlaceholder="Create Your Password"
        />
      </View>

      <View style={styles.signUpOptions}>
        <CustomButton
          buttonColor="blue"
          buttonColorPressed="lightgray"
          buttonText="Sign Up"
          handleOnPress={() => console.log({ name, email, password })}
          setWidth="80%"
        />

        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={{ fontWeight: 'bold' }}>
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
  signUp: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    flex: 2,
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signUpOptions: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
