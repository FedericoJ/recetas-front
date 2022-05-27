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
       
            {tipo:"Pasta",tipoImage:imagesrc},
            {tipo:"Comida china",tipoImage:imagesrc},
            {tipo:"Milanesas",tipoImage:imagesrc},
            {tipo:"Hamburguesas",tipoImage:imagesrc},
            {tipo:"Helados",tipoImage:imagesrc},
            {tipo:"Postres",tipoImage:imagesrc},
       ];

        return (
          <SafeAreaView style={{ backgroundColor:'#ffff',alignItems:"left" }}>
            <Text style={{marginVertical:'5%',marginHorizontal:'5%'}}> Destacado de la semana </Text>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  //data={this.state.carouselItems}
                  data ={tipos}
                  sliderWidth={300}
                  itemWidth={300}
                  //renderItem={this._renderItem}
                  renderItem={({item}) =>(<Recetas tipos ={item}/>)}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );

    }


    

}