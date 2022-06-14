import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Stars from "react-native-stars";
import { NativeBaseProvider, TextArea, Input, Divider } from "native-base";
import Ingredients from "../components/Ingredients";
import { ButtonModal } from "../components/ButtonsLogin";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Steps from "../components/Step";
import {ButtonFondoRosa} from '../components/ButtonsLogin';


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

const tipoImage =
  "https://d320djwtwnl5uo.cloudfront.net/recetas/cover/milan_SuLEW9PUrTwyi0npoGIKD5zNqHmcAb.png";

//select I.nombre, U.cantidad, UNI.descripcion, UNI.IdUnidad, R.idReceta

const arringredientes = [
  { nombre: "Pan rallado", cantidad: 100 },
  { nombre: "Queso rallado", cantidad: 150 },
  { nombre: "Salamin con queso", cantidad: 150 },
];

const arrPasos = [
  { idPaso: 1, descripcion: "Aca cortamos la cebolla en juliana" },
  {
    idPaso: 2,
    descripcion: "Abrimos la nalga al medio mientras le entramos a ella",
  },
  { idPaso: 3, descripcion: "Agregamos sal a piacere" },
];

const ViewReceta = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [Comentario, setComentario] = useState("");
  const [value, setValue] = React.useState(0);

  return (
    <ScrollView style={styles.container}>
      <Image
        style={{ width: "100%", height: 200 }}
        source={{ uri: tipoImage }}
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
          Milanga{" "}
        </Text>

        <Text
          onPress={() => navigation.navigate("ComentarioReceta")}
          style={{ fontSize: 20 }}
        >
          {" "}
          4.1{" "}
        </Text>

        <FontAwesome
          onPress={() => navigation.navigate("ComentarioReceta")}
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

        <Text style={{ fontSize: 12, color: "gray" }}> @mamacora </Text>
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
        <ModalPoup visible={visible}>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={{ fontSize: 20, color: "black" }}> Calificación </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "2%",
                marginBottom: "2%",
                marginHorizontal: "5%",
              }}
            >
              {/* asigno espacio */}
            </View>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating
                name="simple-controlled"
                value={value}
                size="large"
                precision={0.5}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "2%",
                marginBottom: "2%",
                marginHorizontal: "5%",
              }}
            >
              {/* asigno espacio */}
            </View>
            <Text style={{ fontSize: 20, color: "black" }}>
              {" "}
              Agrega tu comentario{" "}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "2%",
                marginBottom: "2%",
                marginHorizontal: "5%",
              }}
            >
              {/* asigno espacio */}
            </View>
            <TextInput
              style={styles.input}
              value={Comentario}
              onChangeText={setComentario}
              multiline={true}
              numberOfLines={4}
            />
            <View></View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "2%",
                marginBottom: "2%",
                marginHorizontal: "5%",
              }}
            >
              {/* asigno espacio */}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "1%",
              marginBottom: "1%",
              marginHorizontal: "1%",
            }}
          >
            <ButtonModal
              text="Atras"
              onPress={() => {
                navigation.navigate("Receta");
                setVisible(false);
              }}
            />
            <ButtonModal
              text="Guardar"
              onPress={() => {
                navigation.navigate("Receta");
                setVisible(false);
              }}
            />
          </View>
        </ModalPoup>

        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{ width: "90%", alignItems: "flex-start" }}
        >
          <Stars
            display={4.1}
            spacing={4}
            count={5}
            starSize={30}
            fullStar={<FontAwesome size={30} name="star" color="blue" />}
            emptyStar={<FontAwesome size={30} name="star-o" color="blue" />}
            halfStar={<FontAwesome size={30} name="star-half" color="blue" />}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons name="heart-plus" size={30} color="gray" />
        </TouchableOpacity>
      </View>

      <NativeBaseProvider>
        <TextArea
          style={{ backgroundColor: "#ffff" }}
          w="90%"
          mx="5"
          value={
            "Tengo una vaca lechera no es una vaca cualquiera, me da leche descremada"
          }
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
          <Text style={{ fontSize: 16, width: "90%" }}> Categoria </Text>

          <Input
            style={{ backgroundColor: "#ffff", textAlign: "center" }}
            mx="1"
            value={"Americana"}
            placeholder="Americana"
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
          <Text style={{ fontSize: 16, width: "90%" }}> Porciones </Text>

          <Input
            style={{ backgroundColor: "#ffff", textAlign: "center" }}
            value={2}
            mx="1"
            w="15%"
            placeholder="2"
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
          <Text style={{ fontSize: 16, width: "90%" }}> Personas </Text>

          <Input
            style={{ backgroundColor: "#ffff", textAlign: "center" }}
            value={1}
            mx="1"
            w="15%"
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
          {" "}
          Ingredientes{" "}
        </Text>

        <Ingredients ingredientes={arringredientes} />

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

        <Steps pasos={arrPasos} />
          
         <View style={{marginTop:"2%",marginHorizontal:"5%",marginBottom:"5%"}} > 
          <ButtonFondoRosa  text="Calcular Receta" onPress={()=> console.log("hola")}/>
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
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  input: {
    height: "100%",
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default ViewReceta;
