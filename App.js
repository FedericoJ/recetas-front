import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import ScannerScreen from "./src/screens/Scanner";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import RegisterPasswordScreen from "./src/screens/RegisterPasswordScreen";
import RegisterSuccessScreen from "./src/screens/RegisterSuccessScreen";
import RegisterFailedScreen from "./src/screens/RegisterFailedScreen";
import Principal from "./src/screens/Principal";
import InicioScreen from "./src/screens/InicioScreen";
import SplashScreen from "./src/screens/SplashScreen";
import RecoveryPasswordScreen from "./src/screens/RecoveryPasswordScreen";
import DigitVerify from "./src/screens/DigitVerify";
import EnterNewPassword from "./src/screens/EnterNewPassword";
import Results from "./src/screens/Results";
import Receta from "./src/screens/ViewReceta";
import ComentarioRecetaScreen from "./src/screens/ComentarioRecetaScreen";
import PerfilScreen from "./src/screens/PerfilScreen";
import EditarPerfilScreen from "./src/screens/EditarPerfilScreen";
import CambiarContraseniaScreen from "./src/screens/CambiarContraseniaScreen";
import Favoritos from "./src/screens/Favoritos";

const Stack = createNativeStackNavigator();

const isAuthenticated = true;
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated && (
          <>
            {/* aca usas solo una pantalla, porque el resto van como hijas de las otras */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Principal"
              options={{ headerShown: false }}
              component={Principal}
            />
            <Stack.Screen name="Scanner" component={ScannerScreen} />
            <Stack.Screen name="Inicio" component={InicioScreen} />
            <Stack.Screen name="DigitVerify" component={DigitVerify} />
            <Stack.Screen name="Results" component={Results} />
            <Stack.Screen name="Receta" component={Receta} />
            <Stack.Screen
              name="ComentarioReceta"
              component={ComentarioRecetaScreen}
            />
            <Stack.Screen name="Perfil" component={PerfilScreen} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
          </>
        )}
        {isAuthenticated && (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="RecoveryPassword"
              component={RecoveryPasswordScreen}
            />
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen
              name="RegisterPassword"
              component={RegisterPasswordScreen}
            />
            <Stack.Screen
              name="RegisterSuccess"
              component={RegisterSuccessScreen}
            />
            <Stack.Screen
              name="RegisterFailed"
              component={RegisterFailedScreen}
            />
            <Stack.Screen
              name="EnterNewPassword"
              component={EnterNewPassword}
            />
            <Stack.Screen
              name="CambiarContrasenia"
              component={CambiarContraseniaScreen}
            />
            <Stack.Screen
              name="Favoritos"
              component={Favoritos}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default App;

//export default createAppContainer(navigator)
//const App = createAppContainer(navigator)
//
//export default () => {
//  return <App />
//};

/*      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name = "Home" component={HomeScreen} />
        <Stack.Screen name = "Scanner" component={ScannerScreen} />
        <Stack.Screen name = "Login" component={LoginScreen} />
        <Stack.Screen name = "Register" component={RegisterScreen} />
        <Stack.Screen name = "RegisterPassword" component={RegisterPasswordScreen} />
        <Stack.Screen name = "RegisterSuccess" component={RegisterSuccessScreen} />
        <Stack.Screen name = "RegisterFailed" component={RegisterFailedScreen} />
        <Stack.Screen name = "Principal" component={Principal} />
        <Stack.Screen name = "Inicio" component={InicioScreen} />
        <Stack.Screen name = "Splash" component={SplashScreen} />
        <Stack.Screen name = "ComentarioReceta" component={ComentarioRecetaScreen} />
      </Stack.Navigator>*/
