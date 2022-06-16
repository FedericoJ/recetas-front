import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Recetas from './Recetas';
import config from "../config/default.json";
import useSWR from 'swr'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider,Skeleton,VStack,Center } from 'native-base';


    const Galeria =()=>{

        const navigation = useNavigation();

        const imagesrc="https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/05/25115909/hamburguesa-destacada.jpg";

        const tipos =[
       
            {tipo:"Pasta",calificacion:3.5,usuario:"@mamacora",tipoImage:imagesrc},
            {tipo:"Comida china",calificacion:3.5,usuario:"@mamacora",tipoImage:imagesrc},
            {tipo:"Milanesas",calificacion:4.5,usuario:"@mamacora",tipoImage:imagesrc},
            {tipo:"Hamburguesas estilo Campo",calificacion:3.5,usuario: "@mamacora",tipoImage:imagesrc},
            {tipo:"Helados",calificacion:2,usuario:"@mamacora",tipoImage:imagesrc},
            {tipo:"Postres",calificacion:1,usuario:"@mamacora",tipoImage:imagesrc},
       ];

       const baseUrl =  config.baseUrl;

       const fetcher = url => axios.get(`${baseUrl}/receta/recetasSemana`).then(res => res.data)
  
       const {data,error}=useSWR(`${baseUrl}/receta/recetasSemana`, fetcher);

       console.log (data);

       if (!data){
            return (
                <NativeBaseProvider>
                        <Center>
                        <VStack w="90%"  borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                        borderColor: "coolGray.500"
                            }} _light={{
                        borderColor: "coolGray.200"
                            }}>
                        <Skeleton h="40" />
                        <Skeleton.Text px="4" />
                        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
                        </VStack>
                    </Center>
            </NativeBaseProvider>
        )

       }else{

        return (
            <SafeAreaView style={{alignItems:"left" ,marginLeft:'5%', marginTop:'2%'}}>
              <Text  style={{marginVertical:'5%',fontSize:20, fontWeight: "bold"}}>Lo destacado de la semana </Text>
              <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                  <Carousel
                    layout={"default"}
                    //ref={ref => this.carousel = ref}
                    //data={this.state.carouselItems}
                    data ={data}
                    sliderWidth={300}
                    itemWidth={400}
                    //renderItem={this._renderItem}
                    renderItem={({item}) =>(<Recetas navegacion={navigation} tipos ={item}/>)}
                    onSnapToItem = { index => this.setState({activeIndex:index}) } />
              </View>
            </SafeAreaView>
          );

       }

        


    }

    export default Galeria;
    