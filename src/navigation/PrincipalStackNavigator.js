import "react-native-gesture-handler";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Principal from "../screens/Principal";
import RecetaStackNavigator from "./RecetaStackNavigator";
import ResultsStackNavigator from "./ResultsStackNavigator";
import CreateRecetaStackNavigator from "./CreateRecetaStackNavigator";
import InicioStackNavigator from "./InicioStackNavigator";

const Stack = createNativeStackNavigator();

const PrincipalStackNavigator = () => {
    return (
        <Stack.Navigator>

            <Stack.Screen name="Principal"
                options={{ headerShown: false }}
                component={Principal} />
            <Stack.Screen name="Receta" options={{ headerShown: false }} component={RecetaStackNavigator} />
            <Stack.Screen name="CreateReceta" options={{ headerShown: false }} component={CreateRecetaStackNavigator} />
            <Stack.Screen name="Results" options={{ headerShown: false }} component={ResultsStackNavigator} />
            <Stack.Screen name="InicioStackNavigator" options={{ headerShown: false }} component={InicioStackNavigator} />



        </Stack.Navigator>
    );
}

export default PrincipalStackNavigator;