import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateReceta from "../screens/CreateReceta";
const Stack = createStackNavigator();

const CreateRecetaStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "CreateReceta" component={CreateReceta} />
        </Stack.Navigator>
    )
}

export default CreateRecetaStackNavigator;