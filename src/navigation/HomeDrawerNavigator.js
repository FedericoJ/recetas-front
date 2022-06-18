import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PrincipalStackNavigator from "./PrincipalStackNavigator"
import EditarPerfilStackNavigator from "./EditarPerfilStackNavigator";
import FavoritosStackNavigator from "./FavoritosStackNavigator"

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="RecetApp"
                component={PrincipalStackNavigator} />
            <Drawer.Screen
                name="Editar Perfil"
                component={EditarPerfilStackNavigator} />
            <Drawer.Screen
                name="Favoritos"
                component={FavoritosStackNavigator}
            />
        </Drawer.Navigator>
    )
}

export default HomeDrawerNavigator;