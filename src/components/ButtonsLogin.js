import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export function ButtonRecuperar (props) {

    const { text, color, backgroundColor } = props

    return(
        <TouchableOpacity
            style = {{
                ...styles.button,
                backgroundColor: '#f1f1f1'
            }}
            >
            <Text
                style = {{
                    ...styles.buttonText,
                    color: { color }
                }}
            >
                { text }
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        borderRadius: 10,
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
    },
    buttonText: {
        textAlign: 'center',
    },
})