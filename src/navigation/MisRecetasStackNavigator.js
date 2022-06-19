import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MisRecetas from "../screens/MisRecetas";
const Stack = createStackNavigator();

const MisRecetasStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "Mis Recetas" component={MisRecetas} />
        </Stack.Navigator>
    )
}

export default MisRecetasStackNavigator;

