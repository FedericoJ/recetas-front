import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PrincipalStackNavigator from "./PrincipalStackNavigator"

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="RecetApp" component={PrincipalStackNavigator}/>
        </Drawer.Navigator>
    )
}

export default HomeDrawerNavigator;