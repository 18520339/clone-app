import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        login: (state, action) => action.payload,
        logout: state => null,
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
