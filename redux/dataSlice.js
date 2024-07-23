import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const initialState = {
  data: [],
  isLoading: false,
  isSaved: false,
  userInput: null,
  error: null,
};

export const getAllData = createAsyncThunk('data/getAllData', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'todolist'));

    const allData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return allData;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const saveData = createAsyncThunk('data/saveData', async (value) => {
  try {
    const docRef = await addDoc(collection(db, 'todolist'), {
      content: value,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
    throw error;
  }
});

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.error.message;
      })
      .addCase(saveData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(saveData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSaved = !state.isSaved;
        state.userInput = null;
      })
      .addCase(saveData.rejected, (state, action) => {
        state.isLoading = false;
        state.userInput = null;
        state.error = action.error.message;
      });
  },
});

export const { setUserInput } = dataSlice.actions;

export default dataSlice.reducer;
