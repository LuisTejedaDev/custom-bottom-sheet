import React, {useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {saveLayout} from './slices/appSlice';
import {BottomSheet} from './Components';
import {useDispatch, useSelector} from 'react-redux';
import {selectVisibleBottomSheet, setVisibleBottomSheet} from './slices/bottomSheetSlice';
import {useKeyboard} from './hooks';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default () => {

    useKeyboard()

    const dispatch = useDispatch()
    const visibleBottomSheet = useSelector(selectVisibleBottomSheet)

    const [data, setData] = useState([
        {
            id: 1,
            name: 'Luka Muller',
            img: 'https://img.freepik.com/foto-gratis/vista-frontal-medico-varon-sonrisa-pared-amarilla_179666-13144.jpg?w=1800&t=st=1719126222~exp=1719126822~hmac=086069dd3875a44c1364a8a559579d4bb54be04e5814e9861ff2fbfbcd6de828',
            time: '12 h',
            description: 'Yeah, that was a crazy!',
            likes: 123,
            likeMe: true
        },
        {
            id: 2,
            name: 'Meley Mugrat',
            img: 'https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg?w=1800&t=st=1719126294~exp=1719126894~hmac=49e281fd02d9de1b54cd1bbcb1bfdc1c66608958d7236a31df75af76c4a3ed48',
            time: '6 h',
            description: 'Fantastic, Awesome. I am agree.',
            likes: 76,
            likeMe: false
        },
        {
            id: 3,
            name: 'Candase Melenes',
            img: 'https://img.freepik.com/foto-gratis/retrato-joven-bella-mujer-natural-peinado-rizado-camisa-rosa-posando-gafas-aisladas_285396-114.jpg?w=1800&t=st=1719126322~exp=1719126922~hmac=2f71e3ea863d558f68cb8431574b2537fc6dfa68f256ee9b12b4343700a20326',
            time: '3 h',
            description: 'There could not be a better solution to the conflict, I agree and count on me.',
            likes: 26,
            likeMe: false
        },
        {
            id: 4,
            name: 'August Piot',
            img: 'https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg?w=1800&t=st=1719126345~exp=1719126945~hmac=0f6a30caf91bc7fb50fd5256d55bfcc502127378c023c413652877ddecb979f3',
            time: '3 h',
            description: 'I have to think about what the possible alternatives to a speech could be.',
            likes: 88,
            likeMe: true
        },
        {
            id: 5,
            name: 'Meredi Moreno',
            img: 'https://img.freepik.com/foto-gratis/vista-frontal-joven-mostrando-tamano-sonriendo-pared-rosa_179666-2897.jpg?w=1800&t=st=1719126360~exp=1719126960~hmac=a0a5d70c0c46e0f13076b23206ab66d250be20551e90f7b972780d5942fbc0bf',
            time: '1 h',
            description: 'Great topic of discussion guys, I like it.',
            likes: 234,
            likeMe: true
        },
    ])

    return (
        <>
            <SafeAreaView style={{backgroundColor: '#7D3C98', zIndex: 10}}/>
            <View
                style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dadada'}}
                onLayout={(e) => dispatch(saveLayout(e?.nativeEvent?.layout?.height))}
            >
                
                <TouchableOpacity onPress={() => dispatch(setVisibleBottomSheet(!visibleBottomSheet))} style={{height: 50, width: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple'}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#fff'}}>{visibleBottomSheet ? 'Ocultar' : 'Mostrar'}</Text>
                </TouchableOpacity>

                <BottomSheet title='Comentarios'>
                    {
                        data.map(x => 
                            <View style={{height: 'auto', alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', marginBottom: 16}}>
                                <View style={{height: 'auto', alignSelf: 'stretch', flexDirection: 'row'}}>
                                    <View style={{height: 45, width: 45, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#7D3C98', borderRadius: 50, marginRight: 12}}>
                                        <Image 
                                            source={{uri: x.img}}
                                            style={{height: 38, width: 38, borderRadius: 50}}
                                            resizeMode={'cover'}
                                        />
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                                        <View style={{height: 'auto', alignSelf: 'stretch', alignItems: 'center', flexDirection: 'row'}}>
                                            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#383838', marginBottom: 4}}>{x.name}</Text>
                                            <View style={{height: 4, width: 4, borderRadius: 10, backgroundColor: '#ADADAD', marginBottom: 4, marginHorizontal: 4}}/>
                                            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#383838', marginBottom: 4}}>{x.time}</Text>
                                        </View>
                                        <Text style={{fontSize: 11, fontWeight: 'normal', color: '#4B4B4B', marginBottom: 8}}>{x.description}</Text>
                                        <View style={{height: 'auto', alignSelf: 'stretch', flexDirection: 'row'}}>
                                            <TouchableOpacity style={{height: 'auto', width: 'auto', justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
                                                <Text style={{fontSize: 12, fontWeight: '500', color: '#4B4B4B'}}>Responder</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{height: 'auto', width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
                                                <Text style={{fontSize: 12, fontWeight: '500', color: '#4B4B4B'}}>Ver traducción</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{height: 45, width: 45, justifyContent: 'center', alignItems: 'flex-end'}}>
                                        <Material name={x.likeMe ? 'heart' : 'heart-outline'} size={14} color={x.likeMe ? '#FF0000' : '#4B4B4B'}/>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                </BottomSheet>
            </View>
            <SafeAreaView style={{backgroundColor: '#7D3C98', zIndex: 10}}/>
        </>
    ) 
}

