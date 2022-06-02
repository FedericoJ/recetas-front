import React from 'react';
import { Text, StyleSheet, View, Button} from 'react-native';

const HomeScreen = ({navigation}) => {

  return (
  <View>
    <Text style={styles.text}>RecetApp</Text>
    <Button 
    title="Go to Principal"
    onPress={() => navigation.navigate('Principal')}
    />
    <Button 
    title="Go to LoginScreen"
    onPress={() => navigation.navigate('Login')}
    />
    <Button 
    title="Go to Register"
    onPress={() => navigation.navigate('Register')}
    />
        <Button 
    title="Go to Set Password"
    onPress={() => navigation.navigate('RegisterPassword')}
    />
    <Button 
    title="Go to Register Success"
    onPress={() => navigation.navigate('RegisterSuccess')}
    />
    
    <Button 
    title="Go to Inicio"
    onPress={() => navigation.navigate('Inicio')}
    />
    <Button 
    title="Go to Splash"
    onPress={() => navigation.navigate('Splash')}
    />
    <Button 
    title="Go to Recovery Password"
    onPress={() => navigation.navigate('RecoveryPassword')}
    />
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;