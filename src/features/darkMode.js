import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'lightmode',
    initialState: true,
    reducers: {
        toggleTheme: (state, action) => {
            return state = !state;
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;