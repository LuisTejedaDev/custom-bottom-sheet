import {useEffect} from "react";
import {Gesture} from "react-native-gesture-handler";
import {Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {useSelector} from "react-redux";
import {selectVisibleBottomSheet} from "../slices/bottomSheetSlice";
import {selectLayout} from "../slices/appSlice";

export default ({size = 'l'}) => {

    const visible = useSelector(selectVisibleBottomSheet)
    const layout = useSelector(selectLayout)

    const {MAX_HEIGHT, CHECKPOINTS, HALF_HEIGHT} = layout

    const swipeTranslateY = useSharedValue(3000)

    const context = useSharedValue({y: 0})
    const pressed = useSharedValue(false) 

    const onSwipe = Gesture.Pan()
        .onBegin(() => {
            pressed.value = true
            context.value = {y: swipeTranslateY.value}
        })
        .onChange((event) => {
            if((size === 's' && event.translationY > 0) || (size === 'l' && (event.translationY + context.value.y) > 0)){
                swipeTranslateY.value = event.translationY + context.value.y;
            }
        })
        .onFinalize(() => {
            pressed.value = false

            if(size === 's'){
                if(swipeTranslateY.value > CHECKPOINTS.pointUno) swipeTranslateY.value = withTiming(MAX_HEIGHT)
                else swipeTranslateY.value = withTiming(0)
            } else {
                if(swipeTranslateY.value > CHECKPOINTS.pointUno && (swipeTranslateY.value < CHECKPOINTS.pointDos)) swipeTranslateY.value = withTiming((MAX_HEIGHT * 50) / 100)
                else if(swipeTranslateY.value > CHECKPOINTS.pointDos) swipeTranslateY.value = withTiming(3000)
                else swipeTranslateY.value = withTiming(0)
            }
        });

    useEffect(() => {
        if(MAX_HEIGHT) swipeTranslateY.value = withTiming(visible ? 0 : MAX_HEIGHT)
    }, [visible, layout])

    const translateStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: swipeTranslateY.value
            }
        ]
    }))

    const opacityStyles = useAnimatedStyle(() => ({
        opacity: interpolate(
            swipeTranslateY.value,
            [0, 100],
            [1, 0],
            Extrapolation.CLAMP
        )
    }))

    const halfSheetSpace = useAnimatedStyle(() => ({
        height: interpolate(
            swipeTranslateY.value,
            [0, HALF_HEIGHT ? HALF_HEIGHT : 100],
            [0, HALF_HEIGHT ? HALF_HEIGHT - 90 : 0],
            Extrapolation.CLAMP
        )
    }))

    return {
        swipeTranslateY,
        onSwipe,
        translateStyles,
        opacityStyles,
        halfSheetSpace
    }
}