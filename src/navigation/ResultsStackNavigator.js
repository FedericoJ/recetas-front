import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Results from "../screens/Results";
const Stack = createStackNavigator();

const ResultsStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name = "Results" component={Results} />
        </Stack.Navigator>
    )
}

export default ResultsStackNavigator;
