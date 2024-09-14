import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './darkMode';
export const store = configureStore({
    reducer:{
        lightTheme: themeReducer    // light theme is the global state accessible by state.lightTheme
                                    // themereducer is responsible for updating the lightTheme state
    }
})