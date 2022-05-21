import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getProductByCode } from '../FakeApi/MockApi';
//Test
const Scanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      findProduct(data)
    };

    const findProduct = (data) => {
        product = getProductByCode(data)
       alert(`el product escaneado es ${product}`) 
        
    }
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
        <View style={styles.container}> 
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style = {StyleSheet.absoluteFill}
                />
            {scanned && <Button title='Tap to Scan again' onPress={() => setScanned(false)}/>}
        </View>    
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'center'
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  header: {
    fontSize: 16,
    marginVertical: 10,
  },
})

  export default Scanner;