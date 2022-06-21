import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditarPerfilScreen from "../screens/EditarPerfilScreen";
import PerfilScreen from "../screens/PerfilScreen";
import CambiarContraseniaScreen from "../screens/CambiarContraseniaScreen";

const Stack = createStackNavigator();

const EditarPerfilStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "PerfilScreen" component={PerfilScreen} />
            <Stack.Screen name = "EditarPerfil" component={EditarPerfilScreen} />
            <Stack.Screen
              name="CambiarContrasenia"
              component={CambiarContraseniaScreen}
            />
        </Stack.Navigator>
    )
}

export default EditarPerfilStackNavigator;

