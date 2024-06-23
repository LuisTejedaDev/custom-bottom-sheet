import {useEffect} from "react";
import {Keyboard} from "react-native";
import {useDispatch} from "react-redux";
import {setKeyboard} from "../slices/appSlice";

export default () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => dispatch(setKeyboard(true)));
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => dispatch(setKeyboard(false)));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [dispatch]);
}