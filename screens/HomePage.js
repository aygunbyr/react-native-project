import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { CustomButton } from '../components';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, 'reactNativeLesson'), {
        title: 'Zero to hero',
        content: 'React Native tutorial for beginners',
        lesson: 95,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getData = async () => {
    const allData = [];
    try {
      const querySnapshot = await getDocs(collection(db, 'reactNativeLesson'));
      setData([]);
      querySnapshot.forEach((doc) => {
        allData.push(doc.data());
      });
      setData(allData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async () => {
    // collection name ve document id
    await deleteDoc(doc(db, 'reactNativeLesson', 'k6iRwLEz2XVrwm8R92Za'));
  };

  const updateData = async () => {
    try {
      const lessonRef = doc(db, 'reactNativeLesson', 'zUELoyp7RWqCzaD4gCPo');

      await updateDoc(lessonRef, {
        lesson: 145,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getData();
  }, [isSaved]);

  return (
    <View style={styles.container}>
      <Text>HomePage</Text>

      {data.map((item, index) => (
        <View key={index}>
          <Text>{item.title}</Text>
          <Text>{item.content}</Text>
          <Text>{item.lesson}</Text>
        </View>
      ))}

      <CustomButton
        buttonColor="blue"
        buttonColorPressed="gray"
        buttonText="Save"
        handleOnPress={() => {
          sendData();
          setIsSaved(!isSaved);
        }}
        setWidth="40%"
      />

      <CustomButton
        buttonColor="blue"
        buttonColorPressed="gray"
        buttonText="Get Data"
        handleOnPress={() => getData()}
        setWidth="40%"
      />

      <CustomButton
        buttonColor="blue"
        buttonColorPressed="gray"
        buttonText="Delete Data"
        handleOnPress={() => deleteData()}
        setWidth="40%"
      />

      <CustomButton
        buttonColor="blue"
        buttonColorPressed="gray"
        buttonText="Update Data"
        handleOnPress={() => updateData()}
        setWidth="40%"
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
