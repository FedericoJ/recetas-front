import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,Box,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons,AntDesign} from "@expo/vector-icons";
import Stars from "react-native-stars";
import { NativeBaseProvider, TextArea, Input, Divider,Spinner,HStack } from "native-base";
import Ingredients from "../components/Ingredients";
import { ButtonModal } from "../components/ButtonsLogin";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Steps from "../components/Step";
import {ButtonFondoRosa} from '../components/ButtonsLogin';
import {useRoute } from '@react-navigation/native';
import config from "../config/default.json";
import useSWR from 'swr'
import axios from 'axios'
import variables from '../config/variables';



const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  );
};

const ViewReceta = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [comentarios, setComentario] = useState("");
  const [calificacion, setCalificacion] = React.useState(0);
  const [isFavorito,setIsFavorito]=React.useState(0);
  const numero = 1;
  const idUsuario =1284//variables.getUsuario();



      const guardarFavorito= async (idReceta,idUsuario)=>{
        const baseUrl =  config.baseUrl;

        const setup = {
          headers: {
            'content-type': 'application/json'
          }
        }

        const body = JSON.stringify({idUsuario,idReceta})
        try{
          const res = await axios.post(`${baseUrl}/receta/cargarFavorito`, body, setup)
          .then(function (res){
            console.log(res.status);
            if (res.status === 200) {
            console.log('favorito guardado correctamente');
            setIsFavorito(1);
          }})
          .catch(function(error){
            console.log(error);
          })
        }catch(error){
          console.log(error.msg);
        }
      }


      const Favoritos =({receta}) =>{

        if (isFavorito===0){
          return (<NativeBaseProvider>
            <HStack space={8} justifyContent="center">
              <Spinner color="warning.500" />
            </HStack>
            </NativeBaseProvider>)
        }
        
        if (isFavorito=== 1) {
          return (<View>
           <AntDesign name="heart" size={30} color="red"/>
           </View>)
        }else{
          return (<View>
            <TouchableOpacity onPress={() => guardarFavorito(receta,idUsuario)}>
              <MaterialCommunityIcons name="heart-plus" size={30} color="gray"/>
            </TouchableOpacity>
          </View>)
        }

      }

  //const values = route.params.datos;
  const onGuardarComment = async (idReceta)=>{

    const idUsuario =variables.getUsuario();
    const baseUrl =  config.baseUrl;
    

    console.log(`${baseUrl}/receta/valorarReceta`)

    console.log(variables.getUsuario());

    setVisible(false);

  // (idUsuario,idReceta,calificacion,comentarios)

    const setup = {
      headers: {
        'content-type': 'application/json'
      }
    }
    const body = JSON.stringify({idUsuario,idReceta,comentarios, calificacion })

      const res = await axios.post(`${baseUrl}/receta/valorarReceta`, body, setup);

      if (res.status === 200) {
        setComentario("");
        setVisible(false);
      }


  }

  const values = variables.getTipos();

  variables.setReceta(values.IdReceta);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const baseUrl =  config.baseUrl;

      console.log(`${baseUrl}/receta/isFavorito?idReceta=${values.IdReceta}&idUsuario=${idUsuario}`)

      axios.get(`${baseUrl}/receta/isFavorito?idReceta=${values.IdReceta}&idUsuario=${idUsuario}`).then(res => res.data)
      .then(function(res){
        console.log(res);
          setIsFavorito(res);
        })
      .catch(function(error){console.log(error)});

      })
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation])

  return (
    <ScrollView style={styles.container}>
      <Image
        style={{ width: "100%", height: 200 }}
        source={{ uri: values.foto }}
      ></Image>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "5%",
          marginBottom: "2%",
          marginHorizontal: "5%",
        }}
      >
        <Text style={{ fontSize: 20, width: "90%", fontWeight: "bold" }}>
          {" "}
          {values.Nombre}{" "}
        </Text>

        <Text
          onPress={() => navigation.navigate("ComentarioReceta")}
          style={{ fontSize: 20 }}
        >
          {" "}
          {values.CalificacionProm}{" "}
        </Text>

        <FontAwesome
          //onPress={() => navigation.navigate("ComentarioReceta")}
          name="star"
          color="#FFD700"
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "2%",
          marginBottom: "2%",
          marginHorizontal: "5%",
        }}
      >
        <FontAwesome name="user" size={30} color="gray" />

        <Text style={{ fontSize: 16, color: "gray", marginLeft:'1%' }}>{values.alias} </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "2%",
          marginBottom: "2%",
          marginHorizontal: "5%",
        }}
      >
      {/*Modal de comentarios*/}
        <ModalPoup visible={visible}>
          
          <View style={{ alignItems: "flex-start" }}>
            <Text style={{ fontSize: 20, color: "black" }}> Calificación </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "4%",
                marginBottom: "2%",
                marginHorizontal: "1%",
              }}>
              <AirbnbRating
              count={5}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
              reviews={[""]}
              defaultRating={0}
              size={30}
              selectedColor="blue"
              showRating={false}
              onFinishRating={(rating)=>setCalificacion(rating)}
            />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "2%",
                marginBottom: "2%",
                marginHorizontal: "5%",
              }}
            >
            </View>
            <Text style={{ fontSize: 20, color: "black" }}>
              {" "}
              Agrega tu comentario{" "}
            </Text>
            <NativeBaseProvider>
            <TextArea
                marginTop="5%"
                w="100%"
                fontSize= "16"
                value={comentarios}
                onChangeText={setComentario}
              />
              </NativeBaseProvider>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "35%",
              marginBottom: "1%",
              marginHorizontal: "1%",
            }}
          >
            <ButtonModal
              text="Atras"
              onPress={() => {
                //navigation.navigate("Receta");
                setVisible(false);
              }}
            />
            <ButtonModal
              text="Guardar"
              onPress={() => onGuardarComment(values.IdReceta)
              }
            />
          </View>
        </ModalPoup>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{ width: "90%", alignItems: "flex-start" }}
        >
          <Stars
            value={values.CalificacionProm}
            spacing={4}
            count={5}
            starSize={30}
            fullStar={<FontAwesome size={30} name="star" color="blue" />}
            emptyStar={<FontAwesome size={30} name="star-o" color="blue" />}
            halfStar={<FontAwesome size={30} name="star-half" color="blue" />}
          />
        </TouchableOpacity>
          <Favoritos receta={values.IdReceta}></Favoritos>
      </View>

      <NativeBaseProvider>
        <TextArea
          style={{ backgroundColor: "#ffff" }}
          w="90%"
          mx="5"
          fontSize= "16"
          value={values.Descripcion}
          placeholder="Disabled TextArea"
          isDisabled
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "2%",
            marginHorizontal: "5%",
          }}
        >
          <Text style={{ fontSize: 16 }}> Categoria </Text>

          <Input
            style={{ backgroundColor: "#ffff", textAlign: "center" }}
            ml="7"
            fontSize= "16"
            isDisabled
            w="70%"
            value={values.DescTipo}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5%",
            marginHorizontal: "5%",
          }}
        >
          <Text style={{ fontSize: 16,width:"85%"}}> Porciones </Text>

          <Input
            fontSize= "16"
            isDisabled
            w="15%"
            style={{ backgroundColor: "#ffff", textAlign: "center"}}
            value={values.Porciones.toString()}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5%",
            marginBottom: "2%",
            marginHorizontal: "5%",
          }}
        >
          <Text style={{ fontSize: 16, width: "85%" }}> Personas </Text>

          <Input
            style={{ backgroundColor: "#ffff", textAlign: "center" }}
            value={values.CantidadPersonas.toString()}
            isDisabled
            w="15%"
            fontSize= "16"
            placeholder="2"
          />
        </View>

        <Divider thickness="2" />

        <Text
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          Ingredientes{" "}
        </Text>

        <Ingredients Receta={values.IdReceta} numero={numero} />

        <Divider my="2" thickness="2" />

        <Text
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          {" "}
          Pasos{" "}
        </Text>

        <Steps Receta={values.IdReceta} />
          
         <View style={{marginTop:"2%",marginHorizontal:"5%",marginBottom:"5%"}} > 
          <ButtonFondoRosa  text="Calcular Receta" onPress={()=> navigation.navigate("CalcularReceta")}/>
        </View>

      </NativeBaseProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6B1B1",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#F7F4F4",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  input: {
    height: "20%",
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default ViewReceta;
