import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    hasConnection: true,
    layout: {},
    keyboard: false
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setHasConnection: (state, action) => {state.hasConnection = action.payload},
        saveLayout: (state, action) => {state.layout = {
            TOTAL_HEIGHT: action.payload,
            MAX_HEIGHT: action.payload, /* Altura maxima del sheet */
            HALF_HEIGHT: (action.payload * 50) / 100,
            CHECKPOINTS: {pointUno: ((action.payload * 50) / 100) / 2, pointDos: action.payload - ((action.payload * 25) / 100)} 
        }},
        setKeyboard: (state, action) => {state.keyboard = action.payload},
    }
})

export const {setHasConnection, saveLayout, setKeyboard} = navSlice.actions

export const selectHasConnection = (state) => state.navApp.hasConnection;
export const selectLayout = (state) => state.navApp.layout;
export const selectKeyboard = (state) => state.navApp.keyboard;

export default navSlice.reducer