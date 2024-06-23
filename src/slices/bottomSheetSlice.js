import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    visibleBottomSheet: false,
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setVisibleBottomSheet: (state, action) => {state.visibleBottomSheet = action.payload},
    }
})

export const {setVisibleBottomSheet} = navSlice.actions

export const selectVisibleBottomSheet = (state) => state.navBottomSheet.visibleBottomSheet;

export default navSlice.reducer