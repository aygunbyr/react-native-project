import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Loading from '../components/Loading';

const LoginPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome {result}</Text>

      <Image
        source={require('../assets/images/password_2665311.png')}
        style={styles.image}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.inputBoxText}>Email</Text>
        <TextInput
          inputMode="email"
          style={styles.textInputStyle}
          placeholder="Enter Your Email"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputBoxText}>Password</Text>
        <TextInput
          secureTextEntry
          style={styles.textInputStyle}
          placeholder="Enter Your Password"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'gray' : 'blue',
          },
          styles.button,
        ]}
        onPress={() => setIsLoading(true)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgray' : 'gray',
            marginTop: 50,
          },
          styles.signupButton,
        ]}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      {isLoading ? (
        <Loading changeIsLoading={() => setIsLoading(false)} />
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
  inputContainer: {
    width: '80%',
  },
  textInputStyle: {
    borderBottomWidth: 0.5,
    borderColor: 'white',
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 10,
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
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
  signupButton: {
    width: '30%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBoxText: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: 'white',
  },
});
