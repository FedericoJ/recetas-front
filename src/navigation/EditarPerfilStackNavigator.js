import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditarPerfilScreen from "../screens/EditarPerfilScreen";
const Stack = createStackNavigator();

const EditarPerfilStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "EditarPerfilScreen" component={EditarPerfilScreen} />
        </Stack.Navigator>
    )
}

export default EditarPerfilStackNavigator;

