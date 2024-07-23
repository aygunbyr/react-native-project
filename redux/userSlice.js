import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    // burada parametreleri object icinde almamiz gerekmiyor, videoda adam boyle yapiyor diye aynisini yaptim
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const token = user.stsTokenManager.accessToken;

      // console.log(user);

      const userData = {
        token,
        user: user,
      };

      await AsyncStorage.setItem('userToken', token);

      // return value is action payload
      return userData;
    } catch (error) {
      console.log('user/login failed: ', error);
      throw error;
    }
  }
);

// Kullanici otomatik giris islemleri
export const autoLogin = createAsyncThunk('user/autoLogin', async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      // return value is action.payload
      return token;
    } else {
      throw new Error('User Not Logged In');
    }
  } catch (error) {
    throw error;
  }
});

// Kullanici cikis islemleri
export const logout = createAsyncThunk('user/logout', async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    await AsyncStorage.removeItem('userToken');
    // return value is action.payload
    return null;
  } catch (error) {
    throw error;
  }
});

// Kullanici kayit islemleri
export const register = createAsyncThunk(
  'user/register',
  async ({ email, password }) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const token = user.stsTokenManager.accessToken;

      await sendEmailVerification(user);

      await AsyncStorage.setItem('userToken', token);

      return token;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  isLoading: false,
  isAuth: false,
  token: null,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message;
      })
      .addCase(autoLogin.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload;
      })
      .addCase(autoLogin.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = 'Invalid Email or Password';
      });
  },
});

export const { setEmail, setPassword, setIsLoading } = userSlice.actions;

export default userSlice.reducer;
