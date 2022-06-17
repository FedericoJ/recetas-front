import React, { useState } from 'react';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text,Button,Input,Icon,View,Modal } from "native-base";
import {StyleSheet,TouchableOpacity} from 'react-native';
//import { MaterialIcons } from "@expo/vector-icons";
import {  ButtonConIconoFondoRosa, ButtonConIconoNegro, ButtonFondoRosa, ButtonFondoBlanco,ButtonConIconoFondoBlanco } from './ButtonsLogin';
import { useNavigation } from '@react-navigation/native';
//import { mdiAlphaACircleOutline } from '@mdi/js';
//import { mdiAccountCircle } from '@mdi/js';
//import { mdiCalendarClock } from '@mdi/js';
//import Icon2 from '@mdi/react';


    const ITEMS = [{
        name: "ingrediente",
        label: "Ingrediente",
    },
    {
        name: "plato",
        label: "Plato",
    },
    {
        name: "tipo",
        label: "Tipo",
    },
    {
        name: "usuario",
        label: "Usuario",
    }];

    const activeItemClass = {marginTop:'10%',fontSize:15, color: '#AC6363',textDecorationLine: 'underline'};
    const inactiveItemClass = {marginTop:'10%',fontSize:15, color: 'gray',textDecorationLine: 'underline'};

   

    const Tabs  = () => {
        


        const navigation = useNavigation();
        const [visible, setVisible] = useState(false);
        const[contiene,setContiene]=useState(true);
        const [orderA, setOrderA] = useState(true);
        const [orderB, setOrderB] = useState(true);
        const [orderC, setOrderC] = useState(true);
        
        const [activeElement, setActiveElement] = React.useState('ingrediente');
    
        const onPressHandler = (item) => {
            setActiveElement(item.name);
        }

        const Boton =() =>{

            if (activeElement==='ingrediente'){

                if (contiene){

                    return (
                        <ButtonConIconoFondoRosa text="Contiene" onPress={() => setContiene(false)}/>
                    )
                }else{

                    return (
                        <ButtonConIconoFondoBlanco text="No Contiene" onPress={() => setContiene(true)}/>
                    )

                }
                

            }else{
                return (<View style={{width:"70%"}}> </View>);
            }

           
    
        }

        return (
            <NativeBaseProvider style={{backgroundColor:'#ffff'}}>
               
                    <View style={styles.container}>
                        {ITEMS.map( (item, i) => (
                            <TouchableOpacity key={item.name} onPress={() => onPressHandler(item)}>

                                <Text  style={activeElement === item.name ? activeItemClass : inactiveItemClass}> {item.label} </Text>

                            </TouchableOpacity>
                        ))}
                    </View>


                    <View style={{backgroundColor:'#ffff'}}>

                        <Input style={{backgroundColor:'#ffff'}} mx="2" my="3" size="large" placeholder="Input" 
                        InputRightElement={
                                            <TouchableOpacity
                                                onPress = { () => navigation.navigate('Results') }
                                            >
                                               {/* <Icon as={<MaterialIcons name="search" />} size={8} ml="2" color="muted.400" />*/}
                                            </TouchableOpacity>
                                            } />
                    
                    <View style={styles.container}>
                        
                       {Boton()}

                       
                        <ButtonConIconoNegro text="Ordenar" onPress={() => setVisible(true)}/>
                    
                        
                    </View>
                    </View>

                        <View style={{backgroundColor:'#ffff'}}>

                           {/*} <section>
                                {(() =>{
                                    switch (visible){
                                        case true : return (
                                            <><View style={{marginHorizontal:"25%", alignItems:"center", flexDirection:"row",justifyContent:"space-between"}}>
                                            <TouchableOpacity onPress={() => setOrderA(false)}> 
                                            <section>
                                            {(() =>{
                                                switch (orderA){  
                                                    case true : return (<Icon2 path={mdiAlphaACircleOutline} title="User Profile" size={1} color="black" />);
                                                    case false: return ( <><TouchableOpacity onPress={() => setOrderA(true)}> <Icon2 path={mdiAlphaACircleOutline} title="User Profile" size={1} color="green" /> </TouchableOpacity></>);            
                                                }
                                            })()}
                                            </section>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setOrderB(false)}> 
                                            <section>
                                            {(() =>{
                                                switch (orderB){  
                                                    case true : return (<Icon2 path={mdiAccountCircle } title="User Profile" size={1} color="black" />);
                                                    case false: return (<><TouchableOpacity onPress={() => setOrderB(true)}> <Icon2 path={mdiAccountCircle } title="User Profile" size={1} color="green" /> </TouchableOpacity></>);            
                                                }
                                            })()}
                                            </section>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setOrderC(false)}> 
                                            <section>
                                            {(() =>{
                                                switch (orderC){  
                                                    case true : return (<Icon2 path={mdiCalendarClock  } title="User Profile" size={1} color="black" />);
                                                    case false: return (<><TouchableOpacity onPress={() => setOrderC(true)}><Icon2 path={mdiCalendarClock  } title="User Profile" size={1} color="green" /></TouchableOpacity></>);            
                                                }
                                            })()}
                                            </section>
                                            </TouchableOpacity>
                                            </View>
                                            
                                            <View style={{marginTop:"5%" ,marginHorizontal:"30%", alignItems:"center", flexDirection:"row",justifyContent:"space-between"}}>
                                            <ButtonFondoRosa text="Aplicar" onPress={() => setVisible(false)} />
                                            </View></>) ;
                                        case false : return null;
                                    }
                                })()}
                            </section>*/}
                    </View>

            </NativeBaseProvider>
          );


         

    };
        

    const styles = StyleSheet.create({
        container: {
        height:"30%",
          flexDirection:"row",
          alignItems:"center",
          backgroundColor:'#ffff',
          justifyContent:"space-between"
        },
        ordernar: {
            flex: 1,
            flexDirection:"row",
            alignItems:"center",
            backgroundColor:'#ffff',
            justifyContent:"space-between"
          },


      });
    
        
export default Tabs