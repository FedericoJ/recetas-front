import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Receta from "../screens/ViewReceta";
import CalcularReceta from "../screens/CalcularReceta";
import ComentarioReceta from "../screens/ComentarioRecetaScreen";
const Stack = createStackNavigator();

const RecetaStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "Receta" component={Receta} />
            <Stack.Screen name = "CalcularReceta" component={CalcularReceta} />
            <Stack.Screen name = "ComentarioReceta" component={ComentarioReceta} />
        </Stack.Navigator>
    )
}

export default RecetaStackNavigator;



