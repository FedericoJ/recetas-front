import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';;

export function ButtonFondoRosa (props) {

    const { text, onPress } = props

    return(
        <TouchableOpacity
            style = {{
                backgroundColor: '#AC6363',
                alignSelf: 'center',
                borderRadius: 5,
                width: '100%',
                marginVertical: 10,
                paddingVertical: 10,
            }}
            onPress = { onPress }
            >
            <Text
                style = {{
                    color: '#fcfafa',
                    textAlign : 'center',
                    fontWeight: 'bold',
                }}
            >
                { text }
            </Text>
        </TouchableOpacity>
    )
}

export function ButtonFondoBlanco (props) {

    const { onPress, text } = props

    return(
        <TouchableOpacity
            style = {{
                backgroundColor: '#fcfafa',
                alignSelf: 'center',
                borderRadius: 5,
                width: '100%',
                marginVertical: 2,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: '#AC6363',
            }}
            onPress = { onPress }
            >
            <Text
                style = {{
                    color: '#AC6363',
                    textAlign : 'center',
                }}
            >
                { text }
            </Text>
        </TouchableOpacity>
    )

}

export function ButtonConIconoFondoRosa (props) {

    const { text, onPress } = props

    return(
        <TouchableOpacity
            style = {{
                backgroundColor: '#AC6363',
                borderRadius: 5,
                width: '20%',
                height: '30%',
                marginVertical: 2,
                marginBottom:'10%',
                marginHorizontal:'2%',
                alignItems:"center",
                justifyContent:"center",
                flexDirection:"row"
            }}
            onPress = { onPress }
            >

            <AntDesign name="check" size={15} color='#fcfafa' />

            <Text
                style = {{
                    color: '#fcfafa',
                    textAlign : 'center',
                    fontWeight: 'bold',
                }}
            >
                { text }
            </Text>
        </TouchableOpacity>
    )
}
