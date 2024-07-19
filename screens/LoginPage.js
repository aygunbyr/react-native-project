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

const LoginPage = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/password_2665311.png')}
        style={styles.image}
      />

      <Text style={styles.welcome}>Welcome {result}</Text>
      <Text>Email</Text>
      <TextInput
        inputMode="email"
        style={styles.textInputStyle}
        placeholder="Enter Your Email"
        value={name}
        onChangeText={setName}
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry
        style={styles.textInputStyle}
        placeholder="Enter Your Password"
        value={lastName}
        onChangeText={setLastName}
      />

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'gray' : 'blue',
          },
          styles.button,
        ]}
        onPress={() => setIsLoading(true)}
      >
        <Text style={styles.buttonText}>Save</Text>
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
  },
  textInputStyle: {
    borderWidth: 1,
    width: 200,
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 10,
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 150,
    height: 150,
  },
  welcome: {
    fontWeight: 'bold',
    fontSize: 26,
  },
});
