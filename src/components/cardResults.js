import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView,
FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Recetas from './Recetas';

const Categorias =({result})=>{

    const navigation = useNavigation();


    return (
        <SafeAreaView style={{height:"70%"}}>
        <Text  style={{textAlign:"center",fontSize:20,fontWeight:"bold",marginBottom:'2%'}}> Resultados </Text>
            <FlatList style= {{marginHorizontal:'2%'}} data ={result}
                numColumns={1}
                renderItem={({item}) => (<Recetas navegacion={navigation} tipos ={item}/>)}>
                refreshing={true}
             </FlatList>

        </SafeAreaView>
      


    )

}

export default Categorias;