import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Guardadas from "../screens/Guardadas";
const Stack = createStackNavigator();

const GuardadasStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "Guardadas" component={Guardadas} />
        </Stack.Navigator>
    )
}

export default GuardadasStackNavigator;