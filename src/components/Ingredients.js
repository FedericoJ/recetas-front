import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import {NativeBaseProvider,TextArea,Input,Select,CheckIcon,HStack} from "native-base";
import RNPickerSelect from 'react-native-picker-select';




class Ingredients extends React.Component{

    constructor(props){

        super(props);

        this.state={

            unidades:[{label:"kg",value:1},
                   {label:"g",value:2}
                    ],
            unidadSel:""

        }
    }

    render(
        
    ){



        var ingredientsList=[];
     


        this.props.ingredientes.forEach((element,index) => {

 
            ingredientsList.push(

                <View>

                <View style={{flexDirection:"row" ,alignItems:"center", marginTop:'5%', marginBottom:'2%', marginLeft:'5%'}}>

                    <Text style={{fontSize:16, width:'60%'}}> {element.nombre} </Text> 

                    <NativeBaseProvider>

                        <HStack>

                            <Input style={{backgroundColor:'#ffff',textAlign:"center" }} w='40%' mx="2"  value={element.cantidad}  />


                        
                            <Select 
                                selectedValue={this.state.unidadSel}
                                style={{backgroundColor:'#ffff'}}
                                w='30%'
                                mx="2"
                                _selectedItem={{
                                    bg: "indigo",
                                    endIcon: <CheckIcon size={5} />
                                    }} 
                                onValueChange={(itemValue)=>this.setState({unidadSel:itemValue})}>
                                {this.state.unidades.map( (unidad) => (
                                    <Select.Item key={unidad.value} label={unidad.label} value={unidad.value} />
                                ))}          
                            </Select>

                        </HStack>

                    </NativeBaseProvider>


                </View>

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