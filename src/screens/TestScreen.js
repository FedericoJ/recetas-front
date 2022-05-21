import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Button} from 'react-native';


const TestScreen = ({navigation}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        getGender();
      }, []);

    const getGender = async () => {
        try{
            const response = await fetch('http://LOCALIPV4:5000/api/gender/GetGenders');
            const json = await response.json();
            setData(json);
            console.log(json);
        }catch(error){
            console.log(error)
        }
    }

  return (
  <View>
    <Text>Test Screeen!</Text>
  </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default TestScreen;