// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAUBeQClGemhA3ym9aCjLlRsvmkVU-DN6s',
  authDomain: 'test-app-37ef5.firebaseapp.com',
  projectId: 'test-app-37ef5',
  storageBucket: 'test-app-37ef5.appspot.com',
  messagingSenderId: '425230672439',
  appId: '1:425230672439:web:819581f6cdab723abfd5b2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);

export default app;
