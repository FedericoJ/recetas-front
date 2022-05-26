import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ScannerScreen from './src/screens/Scanner';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RegisterSuccessScreen from './src/screens/RegisterSuccessScreen';
import RegisterFailedScreen from './src/screens/RegisterFailedScreen';
import Principal from './src/screens/Principal';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createNativeStackNavigator();

//const Drawer = createDrawerNavigator();

const App = () =>{
  return(
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name = "Home" component={HomeScreen} />
        <Stack.Screen name = "Scanner" component={ScannerScreen} />
        <Stack.Screen name = "Login" component={LoginScreen} />
        <Stack.Screen name = "Register" component={RegisterScreen} />
        <Stack.Screen name = "RegisterSuccess" component={RegisterSuccessScreen} />
        <Stack.Screen name = "RegisterFailed" component={RegisterFailedScreen} />
        <Stack.Screen name = "Principal" component={Principal} />
      </Stack.Navigator>

    
    </NavigationContainer>
  );
}

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
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
        <Stack.Screen name = "RegisterSuccess" component={RegisterSuccessScreen} />
        <Stack.Screen name = "RegisterFailed" component={RegisterFailedScreen} />
        <Stack.Screen name = "Principal" component={Principal} />
      </Stack.Navigator>*/