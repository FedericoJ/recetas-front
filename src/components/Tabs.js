import React, { useState } from 'react';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text,Button,Input,Icon,View,Modal } from "native-base";
import {StyleSheet,TouchableOpacity} from 'react-native';
import {  ButtonConIconoFondoRosa, ButtonConIconoNegro, ButtonFondoRosa, ButtonFondoBlanco,ButtonConIconoFondoBlanco } from './ButtonsLogin';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 

    const activeItemClass = {fontSize:15, color: '#AC6363',textDecorationLine: 'underline'};
    const inactiveItemClass = {fontSize:15, color: 'gray',textDecorationLine: 'underline'};

    const Tabs  = () => {

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

        const navigation = useNavigation();
        const [visible, setVisible] = useState(false);
        const[contiene,setContiene]=useState(true);
        const [orderA, setOrderA] = useState(true);
        const [orderB, setOrderB] = useState(true);
        const [orderC, setOrderC] = useState(true);
        const [activeElement, setActiveElement] = useState("ingrediente");
        
        var servicio = "recetaPorIngrediente";

        const onPressHandler = (item) => {
            setActiveElement(item.name)
            //console.log(item.name);
        };


        const onPressSearch =() =>{

          
                if (activeElement ==="ingrediente"){
                    if (contiene) {
                        servicio="recetaPorIngrediente";
                    }else{
                        servicio="recetaSinIngrediente";
                    }
                }

                if(activeElement ==="usuario"){
                    servicio="recetaPorUsuario";
                }   
                if(activeElement ==="plato"){
                    servicio="RecetaPorNombre";
                }
                if(activeElement ==="tipo"){
                    servicio="getRecetaPorNombreTipo";
                }
                   

            navigation.navigate('Results',{service: servicio})

        }

         // return (<ButtonConIconoFondoBlanco text="No Contiene" onPress={() => setContiene(true)}/>)

        const Boton =() =>{

            if (activeElement ==="ingrediente"){
                if (contiene){
                    return (<ButtonConIconoFondoRosa text="Contiene" onPress={() => setContiene(false)}/>)
                }else{
                    return (<ButtonConIconoFondoBlanco text="No Contiene" onPress={() => setContiene(true)}/>)
                }
               
            }else{
                return (<View style={{width:"70%"}}></View>)
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
                                                onPress = { () => onPressSearch() }
                                            >
                                               {<FontAwesome name="search" size={24} color="black"/>}
                                            </TouchableOpacity>
                                            } />
                    
                        <View style={{flexDirection:"row",alignItems:"center",backgroundColor:'#ffff',}}>
                            <Boton> </Boton>
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
            height:"20%",
          flexDirection:"row",
          marginTop:"5%",
          alignItems:"center",
          backgroundColor:'#ffff',
          justifyContent:"space-between"
        }
      });
    
        
export default Tabs