import React from "react";
import { ScrollView, StyleSheet,View } from "react-native";
import Tabs from "../components/Tabs";
import Galeria from "../components/Carousel";
import Categorias from "../components/Categorias";
import { FAB } from "react-native-paper";

const Principal = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Tabs />

      <Galeria navegacion={navigation} />

      <Categorias />

      <FAB
        style={styles.fab}
        extended
        icon="pencil"
        label="Nueva"
        uppercase={false}
        onPress={() =>navigation.navigate('CreateReceta')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6B1B1",
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFD700",
  },
});

export default Principal;
