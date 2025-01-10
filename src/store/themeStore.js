import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     theme: typeof window !== 'undefined' ? localStorage.getItem('chat-theme') || 'coffee' : 'coffee',
};

const themeSlice = createSlice({
     name: 'theme',
     initialState,
     reducers: {
          setTheme: (state, action) => {
               state.theme = action.payload;
               if (typeof window !== 'undefined') {
                    localStorage.setItem('chat-theme', action.payload);
               }
          },
     },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
