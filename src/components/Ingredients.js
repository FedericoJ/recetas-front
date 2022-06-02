import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import {NativeBaseProvider,TextArea,Input} from "native-base";
import RNPickerSelect from 'react-native-picker-select';




class Ingredients extends React.Component{

    constructor(props){

        super(props);

        this.state={

            unidades:[{label:"kg",value:1},
                   {label:"g",value:2}]
        }
    }

    render(
        
    ){



        var ingredientsList=[];


        this.props.ingredientes.forEach(element => {

            ingredientsList.push(

                <View style={{flexDirection:"row" , alignItems:"center", marginTop:'5%', marginBottom:'2%', marginHorizontal:'5%'}}>

                    <Text style={{fontSize:16, width:'40%'}}> {element.nombre} </Text> 

                    <NativeBaseProvider>

                        <Input style={{backgroundColor:'#ffff',textAlign:"center"}} mx="1" value={element.cantidad}  />

                    </NativeBaseProvider>

                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={this.state.unidades}
                    />


                </View>
                        

            )
            
        });
    
        return (

            
            <View>

                {ingredientsList}

            </View>
        )
    }

}

export default Ingredients;