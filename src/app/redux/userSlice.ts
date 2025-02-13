import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { compareHashedPassword, generateHashedPassword } from '../utils';

interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  loggedInUser: User | null;
  authToken: string | null;
}

const initialState: UserState = {
  users: [],
  loggedInUser: null,
  authToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    updateUser(state, action: PayloadAction<{email?: string, userName?: string}>) {
      const users = state.users;
      const userEmail = state.authToken?.split("_")[1];
      const index = users.findIndex((user) => user.email === userEmail);
      if(index !== -1){
        users[index].email = action.payload.email || users[index].email;
        users[index].userName = action.payload.userName || users[index].userName;
      }
      state.users = users;
    },
    updatePassword(state, action: PayloadAction<{oldPassword: string; newPassword: string}>) {
      const {oldPassword, newPassword} = action.payload;
      const users = state.users;
      const userEmail = state.authToken?.split("_")[1];
      const index = users.findIndex((user) => user.email === userEmail);
      if(index !== -1){
        const hashedPassword = users[index].password;
        const isPwdMatch = compareHashedPassword(oldPassword, hashedPassword);
        if(isPwdMatch){
          users[index].password = generateHashedPassword(newPassword);
          state.users = users;
        }
       
      }
      state.users = users;
    },
    getCurrentUser(state) {
      const users = state.users;
      const userEmail = state.authToken?.split("_")[1];
      const user = users.find((user) => user.email === userEmail);
      if(user){
        state.loggedInUser = user;
      }
    },
    deleteUser(state) {
      const userEmail = state.authToken?.split("_")[1];
      const index = state.users.findIndex((user) => user.email === userEmail);
      if(index !== -1){
        state.users.splice(index, 1);
        state.authToken = null;
      }
    },
    setToken(state, action: PayloadAction<{token: string}>) {
        state.authToken = action.payload.token;
        const users = state.users;
        const userEmail = state.authToken?.split("_")[1];
        const user = users.find((user) => user.email === userEmail);
        if(user){
          state.loggedInUser = user;
        }
        localStorage.setItem('authToken', action.payload.token);
    },
    getToken(state){
        state.authToken = localStorage.getItem('authToken');
    },
    logout(state) {
      state.authToken = null;
      state.loggedInUser = null;
      localStorage.removeItem('authToken');
    },
  },
});

export const { addUser, updateUser, updatePassword, deleteUser, setToken, getToken, logout, getCurrentUser } = userSlice.actions;

export default userSlice.reducer;
