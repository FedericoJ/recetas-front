import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

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