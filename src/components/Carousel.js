import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Recetas from './Recetas';

export default class Galeria extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              text: "Text 1",
          },
          {
              title:"Item 2",
              text: "Text 2",
          },
          {
              title:"Item 3",
              text: "Text 3",
          },
          {
              title:"Item 4",
              text: "Text 4",
          },
          {
              title:"Item 5",
              text: "Text 5",
          },
        ]
      }
    }

   
   

    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 250,
              padding: 50,
              marginLeft: 25,
              marginRight: 25, }}>
            <Text style={{fontSize: 30}}>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>

        )
    }

    render() {

        const imagesrc="https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/05/25115909/hamburguesa-destacada.jpg";

        const tipos =[
       
            {tipo:"Pasta",calificacion:3.5,usuario:"@mamacora",tipoImage:imagesrc},
            {tipo:"Comida china",calificacion:3.5,usuario:"@mamacora",tipoImage:imagesrc},
            {tipo:"Milanesas",calificacion:4.5,usuario:"@mamacora",tipoImage:imagesrc},
            {tipo:"Hamburguesas estilo Campo",calificacion:3.5,usuario: "@mamacora",tipoImage:imagesrc},
            {tipo:"Helados",calificacion:2,usuario:"@mamacora",tipoImage:imagesrc},
            {tipo:"Postres",calificacion:1,usuario:"@mamacora",tipoImage:imagesrc},
       ];

        return (
          <SafeAreaView style={{alignItems:"left" ,marginLeft:'5%', marginTop:'2%'}}>
            <Text  style={{marginVertical:'5%',fontSize:20, fontWeight: "bold"}}>Lo destacado de la semana </Text>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  //data={this.state.carouselItems}
                  data ={tipos}
                  sliderWidth={300}
                  itemWidth={400}
                  //renderItem={this._renderItem}
                  renderItem={({item}) =>(<Recetas tipos ={item}/>)}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );

    }


    

}