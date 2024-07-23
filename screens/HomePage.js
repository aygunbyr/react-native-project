import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
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
  const [updatedData, setUpdatedData] = useState('');

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
        allData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setData(allData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (value) => {
    try {
      // collection name ve document id
      await deleteDoc(doc(db, 'reactNativeLesson', value));
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (value) => {
    try {
      const lessonRef = doc(db, 'reactNativeLesson', value);

      await updateDoc(lessonRef, {
        content: updatedData,
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
      <TextInput
        placeholder="enter your data"
        onChangeText={setUpdatedData}
        value={updatedData}
        style={{
          borderWidth: 1,
          width: '50%',
          paddingVertical: 10,
          textAlign: 'center',
          marginBottom: 10,
        }}
      />

      {data.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => {
            // deleteData(item.id);
            updateData(item.id);
            setIsSaved(!isSaved);
          }}
        >
          <Text>{item.id}</Text>
          <Text>{item.title}</Text>
          <Text>{item.content}</Text>
          <Text>{item.lesson}</Text>
        </Pressable>
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
