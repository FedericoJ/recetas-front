import "react-native-gesture-handler";
import React from "react";
import CustomDrawer from "../components/CustomDrawer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from "@react-navigation/drawer";
import PrincipalStackNavigator from "./PrincipalStackNavigator"
import EditarPerfilStackNavigator from "./EditarPerfilStackNavigator";
import FavoritosStackNavigator from "./FavoritosStackNavigator";
import CreateRecetaStackNavigator from "./CreateRecetaStackNavigator";
import GuardadasStackNavigator from "./GuardadasStackNavigator";
import MisRecetasStackNavigator from "./MisRecetasStackNavigator";
import InicioStackNavigator from "./InicioStackNavigator";


const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{ drawerActiveBackgroundColor:'#FFD700', drawerActiveTintColor: '#fff', drawerLabelStyle: {marginLeft:-25}}}
        >
            <Drawer.Screen
                name="RecetApp"
                component={PrincipalStackNavigator}
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    )
                }} />
            <Drawer.Screen
                name="Editar Perfil"
                component={EditarPerfilStackNavigator} 
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="person-outline" size={22} color={color} />
                    )
                }}/>
            <Drawer.Screen
                name="Favoritos"
                component={FavoritosStackNavigator}
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="heart-outline" size={22} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name="Crear Receta"
                component={CreateRecetaStackNavigator}
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="add-circle-outline" size={22} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name="Guardadas"
                component={GuardadasStackNavigator}
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="download-outline" size={22} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name="Mis Recetas"
                component={MisRecetasStackNavigator}
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="newspaper-outline" size={22} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name="Cerrar Sesion"
                screenOptions={{ headerShown: false }}
                component={InicioStackNavigator}
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="log-out-outline" size={22} color={color} />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

export default HomeDrawerNavigator;