import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favoritos from "../screens/Favoritos";
const Stack = createStackNavigator();

const FavoritosStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "Favoritos" component={Favoritos} />
        </Stack.Navigator>
    )
}

export default FavoritosStackNavigator;

