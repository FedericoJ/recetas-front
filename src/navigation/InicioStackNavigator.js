import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from "../screens/InicioScreen";
const Stack = createStackNavigator();

const InicioStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "Inicio" component={InicioScreen} />
        </Stack.Navigator>
    )
}

export default InicioStackNavigator;