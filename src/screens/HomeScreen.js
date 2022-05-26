import React from 'react';
import { Text, StyleSheet, View, Button} from 'react-native';

const HomeScreen = ({navigation}) => {

  return (
  <View>
    <Text style={styles.text}>Seminario</Text>
    <Button 
    title="Go to Scanner"
    onPress={() => navigation.navigate('Scanner')}
    />
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
    title="Go to Register Success"
    onPress={() => navigation.navigate('RegisterSuccess')}
    />
        <Button 
    title="Go to Register Failed"
    onPress={() => navigation.navigate('RegisterFailed')}
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