import React, { useState } from "react";
import {  ScrollView,  StyleSheet,  Image,  View,  Text,  TouchableOpacity,  TextInput,  Modal,} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeBaseProvider, TextArea, Input, Divider, FormControl,VStack, HStack,Select,CheckIcon } from "native-base";
import { ButtonModal, ButtonFondoBlanco, ButtonFondoRosa, ButtonCreateBlanco,ButtonCreateRosa, ButtonModalUnico } from "../components/ButtonsLogin";
import Box from "@mui/material/Box";



const ModalPoUp = ({ visible, children }) => {
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

  const [visible, setVisible] = React.useState(false);



export function ModalPopUp (props) {


    const {visible, textOpcion, textModal ,onPress } = props

}

  <ModalPoUp visible={visible}>
                    <View style={{ alignItems: "flex-start" }}>
                      <Text style={{ fontSize: 20, color: "black" }}>
                      {textModal}
                      </Text>
                    </View>

                    <View style={styles.botonesModal}>
                      <ButtonModal
                        text= {textOpcion}
                        onPress={() => {
                            { onPress };
                        }}
                      />
                    </View>
                  </ModalPoUp>


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#D6B1B1",
    },
    botones: {
      flexDirection:"row",
      backgroundColor:"#D6B1B1",
      justifyContent:"center",
    },
    imagenPaso: {
      flexDirection:"row",
      backgroundColor:"#D6B1B1",
      justifyContent:"left",
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
    botonesModal: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: "5%",
      marginBottom: "1%",
      marginHorizontal: "1%",
    },
    botonesModal2: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginTop: "2%",
      marginBottom: "1%",
    },
  
  });