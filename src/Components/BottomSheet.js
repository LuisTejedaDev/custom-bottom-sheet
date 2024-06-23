import {useEffect, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useBottomSheet} from "../hooks"
import {selectKeyboard, selectLayout} from "../slices/appSlice"
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native"
import {GestureDetector} from "react-native-gesture-handler"
import {setVisibleBottomSheet} from "../slices/bottomSheetSlice"
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated, {runOnJS, useAnimatedKeyboard, useAnimatedStyle, useDerivedValue} from "react-native-reanimated"

let firstInputHeight = 0

export default ({title = '', size = 'l', children}) => {

    const dispatch = useDispatch()

    const scrollRef = useRef()
    const inputRef = useRef()

    const openKeyboard = useSelector(selectKeyboard)

    const keyboard = useAnimatedKeyboard()
    const {onSwipe, translateStyles, opacityStyles, halfSheetSpace, swipeTranslateY} = useBottomSheet({size: size})

    const layout = useSelector(selectLayout)
    const {MAX_HEIGHT} = layout

    const [pointerEvent, setPointerEvent] = useState('none')

    const [value, setValue] = useState('')
    const [contentHeight, setContentHeight] = useState(0);
    
    const contentKeyboardStyle = useAnimatedStyle(() => ({
        height: keyboard.height.value + (pointerEvent === 'auto' ? contentHeight < 140 ? contentHeight : 140 : firstInputHeight)
    }))

    const animatedKeyboardStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: -keyboard.height.value
            }
        ]
    }))

    const handlePointerEvent = (state) => setPointerEvent(state)
    
    const handleVisibilityBottomSheet = (state) => {
        setValue('')
        inputRef.current.blur()
        dispatch(setVisibleBottomSheet(state))
    }
    
    useDerivedValue(() => {
        /* cuando esta en esta posición no puede tener pointerEvents la caja 
        para que no interrumpa acciones en los comentarios */
        if(swipeTranslateY.value === ((MAX_HEIGHT * 50) / 100)) runOnJS(handlePointerEvent)('none')
        else if(swipeTranslateY.value === 0) runOnJS(handlePointerEvent)('auto')
        else if(swipeTranslateY.value === 3000) {
            runOnJS(handleVisibilityBottomSheet)(false)
        }
})

    const handleInputChange = (text) => {
        setValue(text)
    }

    const handleInputSizeChange = (contentWidth, contentHeight) => {
        setContentHeight(contentHeight);
        scrollRef.current?.scrollToEnd({ animated: true })
        if(!value) firstInputHeight = contentHeight
    };

    useEffect(() => {
        if(openKeyboard) scrollRef.current?.scrollToEnd({ animated: true })
        else scrollRef.current?.scrollTo({ y: 0, animated: true })
    }, [openKeyboard])
    
    return(
        <>
            <Animated.View style={[{ height: MAX_HEIGHT, width: '100%', backgroundColor: '#fff', position: 'absolute', bottom: 0, borderTopStartRadius: 16, borderTopEndRadius: 16, overflow: 'hidden'}, translateStyles]}>
                <GestureDetector gesture={onSwipe}>
                    <View style={{height: 65, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#dadada'}}>
                        <View style={{width: 35, height: 4, borderRadius: 10, backgroundColor: '#4B4B4B', marginBottom: 10}}/>
                        <Text style={{fontSize: 15, color: '#4B4B4B', fontWeight: 'bold'}}>{title}</Text>
                    </View>
                </GestureDetector> 
                <ScrollView
                    ref={scrollRef}
                    style={{height: 'auto', alignSelf: 'stretch'}}
                    contentContainerStyle={{paddingHorizontal: 12, paddingTop: 12, paddingBottom: 72}}
                >
                    
                    {
                        children
                    }

                    {/* espacio al abrir el teclado */}
                    <Animated.View style={contentKeyboardStyle}/>

                    {/* espacio cuando se hace pequeño el bottomSheet y que se vean todos los comentarios */}
                    <Animated.View style={halfSheetSpace}/>

                </ScrollView>
            </Animated.View>
            
            <Animated.View
                pointerEvents={pointerEvent}
                style={[styles.bottomSection, {alignItems: (firstInputHeight !== contentHeight) ? 'flex-end' : 'center', paddingTop: (firstInputHeight !== contentHeight) ? 0 : 5, paddingBottom: (firstInputHeight !== contentHeight) ? 12 : 9}, animatedKeyboardStyle, opacityStyles]}>
                <View style={{height: 45, width: 45, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#7D3C98', borderRadius: 50, marginRight: 12}}>
                    <Image 
                        source={{uri: 'https://img.freepik.com/foto-gratis/apuesto-joven-brazos-cruzados-sobre-fondo-blanco_23-2148222620.jpg?w=1380&t=st=1719099956~exp=1719100556~hmac=7ba4e7627196dba0d5f34aebb8958d5125af9322a796fd298063288b9f673143'}}
                        style={{height: 38, width: 38, borderRadius: 50}}
                        resizeMode={'cover'}
                    />
                </View>
                <TextInput
                    ref={inputRef}
                    value={value}
                    onChangeText={handleInputChange}
                    multiline
                    style={styles.input}
                    onContentSizeChange={(e) => handleInputSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)}
                    placeholder={'Ingresa tu comentario'}
                    selectionColor={'#7D3C98'}
                />
                <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                    <Material
                        name={'send'}
                        size={22}
                        color={'#4B4B4B'}
                    />
                </TouchableOpacity>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        maxHeight: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        fontSize: 14,
        color: '#4B4B4B'
    },
    bottomSection: {
        minHeight: 55,
        height: 'auto',
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderTopWidth: 0.5,
        backgroundColor: '#fff',
        borderTopColor: '#dadada',
        justifyContent: 'center',
        paddingLeft: 12,
        position: 'absolute',
        bottom: 0
    }
})