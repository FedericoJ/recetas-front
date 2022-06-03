import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import {NativeBaseProvider,TextArea,Input,Select,CheckIcon} from "native-base";
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


        this.props.ingredientes.forEach(element => {

            ingredientsList.push(

                <View>

                <View style={{flexDirection:"row" , justifyContent:"center",alignItems:"center", marginTop:'5%', marginBottom:'2%', marginLeft:'5%'}}>

                    <Text style={{fontSize:16, width:'60%'}}> {element.nombre} </Text> 

                    <NativeBaseProvider>

                        <Input style={{backgroundColor:'#ffff',textAlign:"center" ,width:'20%'}} mx="1" value={element.cantidad}  />


                        <Select 
                            selectedValue={this.state.unidadSel}
                            _selectedItem={{
                            bg: "indigo",
                            endIcon: <CheckIcon size={5} />
                            }} 
                            onValueChange={()=>console.log('hola')}>
                            {this.state.unidades.map( (unidad) => (
                                <Select.Item key={unidad.value} label={unidad.label} value={unidad.value} />
                            ))}          
                        </Select>

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