import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Button } from 'native-base';

export function ButtonFondoRosa(props) {

    const { text, onPress } = props

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#AC6363',
                alignSelf: 'center',
                borderRadius: 5,
                width: '100%',
                marginVertical: 10,
                paddingVertical: 10,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: '#fcfafa',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export function ButtonFondoBlanco(props) {

    const { onPress, text } = props

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#fcfafa',
                alignSelf: 'center',
                borderRadius: 5,
                width: '100%',
                marginVertical: 2,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: '#AC6363',
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: '#AC6363',
                    textAlign: 'center',
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )

}

export function ButtonConIconoFondoRosa(props) {

    const { text, onPress } = props

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#AC6363',
                borderRadius: 5,
                width: '30%',
                height: '50%',
                marginVertical: 2,
                marginBottom: '10%',
                marginHorizontal: '3%',
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row"
            }}
            onPress={onPress}
        >

            <AntDesign name="check" size={15} color='#fcfafa' />

            <Text
                style={{
                    color: '#fcfafa',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export function ButtonConIconoFondoBlanco (props) {

    const { text, onPress } = props

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#fcfafa',
                borderColor: '#AC6363',
                borderRadius: 5,
                width: '30%',
                height: '50%',
                marginVertical: 2,
                marginBottom:'10%',
                marginHorizontal:'3%',
                alignItems:"center",
                justifyContent:"center",
                flexDirection:"row"
            }}
            onPress={onPress}
        >

            <Entypo name="cross" size={15} color='#AC6363' />

            <Text
                style={{
                    color: '#AC6363',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}




export function ButtonConIconoNegro(props) {

    const { text, onPress } = props

    return (
        <TouchableOpacity
            style={{
                backgroundColor: 'white',
                borderRadius: 5,
                width: '20%',
                height: '50%',
                marginVertical: 2,
                marginBottom:'10%',
                marginLeft:"40%",
                marginHorizontal:'3%',
                alignItems:"center",
                justifyContent:"center",
                flexDirection:"row"
            }}            
            onPress = { onPress }
            >
            <Octicons name="filter" size={20} color="black" />

            <Text
                style={{
                    color: 'black',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                {" "} {text}
            </Text>
        </TouchableOpacity>
    )
}

export function ButtonModal(props) {

    const { text, onPress } = props

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#F7F4F4',
                alignSelf: 'center',
                borderRadius: 5,
                width: '50%',
                marginVertical: 10,
                paddingVertical: 10,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: '#AC6363',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export function ButtonModalUnico(props) {

    const { onPress, text } = props

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#F7F4F4',
                alignSelf: 'center',
                borderRadius: 5,
                width: '100%',
                marginVertical: 10,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: '#F7F4F4',
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: '#AC6363',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )

}

export function ButtonCreateRosa(props) {

    const { text, onPress } = props

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#AC6363',
                alignSelf: 'center',
                borderRadius: 5,
                width: '50%',
                marginVertical: 10,
                paddingVertical: 10,
                marginHorizontal: "5%"
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: '#fcfafa',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}



export function ButtonCreateBlanco(props) {

    const { text, onPress } = props

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#fcfafa',
                alignSelf: 'center',
                borderRadius: 5,
                width: '40%',
                marginVertical: 10,
                paddingVertical: 10,
                marginHorizontal: "5%",
                borderColor: '#AC6363',
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: '#AC6363',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export function ButtonAliasRecomendado(props) {

    const { text, onPress } = props

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#788896',
                borderRadius: 5,
                marginVertical: 2,
                alignItems: "center",
                width: '30%',
                justifyContent: 'space-between'
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: 'white'
                  }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export function ButtonInvisible () {

    return(
        <Button
            style = {{
                backgroundColor: 'transparent',
                borderRadius: 5,
                width: '30%',
                height: '50%',
                marginVertical: 2,
                marginBottom:'10%',
                marginHorizontal:'3%',
                alignItems:"center",
                justifyContent:"center",
                flexDirection:"row"
            }}

            >
        </Button>
    )
}