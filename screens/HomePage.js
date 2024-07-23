import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';

import Animated, {
  BounceIn,
  FlipInEasyX,
  FlipInYRight,
  PinwheelIn,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { setUserInput, saveData } from '../redux/dataSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  const { data, userInput } = useSelector((state) => state.data);

  const deleteData = async (value) => {
    try {
      // collection name ve document id
      await deleteDoc(doc(db, 'reactNativeLesson', value));
    } catch (error) {
      console.log(error);
    }
  };

  // const updateData = async (value) => {
  //   try {
  //     const lessonRef = doc(db, 'reactNativeLesson', value);

  //     await updateDoc(lessonRef, {
  //       content: updatedData,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };

  // Kullanici cikis islemleri
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-do List</Text>
      <Animated.FlatList
        entering={PinwheelIn}
        style={styles.flatList}
        data={data}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FlipInYRight.delay(index * 100)}
            style={styles.flatListItemContainer}
          >
            <Pressable
              onPress={() => deleteData(item.id)}
              style={styles.iconContainer}
            >
              <AntDesign name="checkcircle" size={24} color="black" />
              <Entypo name="circle" size={24} color="black" />
            </Pressable>

            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text>{item.content}</Text>
            </View>
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.userInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add To Do"
          onChangeText={(text) => dispatch(setUserInput(text))}
          value={userInput}
          placeholderTextColor="lightgray"
        />

        <CustomButton
          buttonColor="blue"
          buttonColorPressed="gray"
          buttonText="Save Data"
          handleOnPress={() => dispatch(saveData(userInput))}
          setWidth="40%"
        />
      </View>

      {/* <CustomButton
        buttonColor="red"
        buttonColorPressed="gray"
        buttonText="Logout"
        handleOnPress={handleLogout}
        setWidth="40%"
      /> */}
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
  flatListItemContainer: {
    borderBottomWidth: 0.3,
    marginVertical: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  flatList: {
    width: '90%',
    padding: 10,
  },
  itemContainer: {
    flex: 5,
    marginLeft: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  userInputContainer: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 3,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: 'white',
    paddingVertical: 5,
    textAlign: 'center',
    marginRight: 5,
  },
});
