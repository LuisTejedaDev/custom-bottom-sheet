import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {appSlice, bottomSheetSlice} from './slices';
import thunk from 'redux-thunk';

applyMiddleware
export const store = configureStore({
    reducer: {
        navApp: appSlice,
        navBottomSheet: bottomSheetSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
}, applyMiddleware(thunk))