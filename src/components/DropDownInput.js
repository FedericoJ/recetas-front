import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import { theme } from '../core/theme'

export default function DropDownInput({label, value, setValue, list, ...props}){
return(
    <View style={styles.container}>
        <DropDown
            style={styles.input}
            label={label}
            mode={"outlined"}
            value={value}
            setValue={setValue}
            list={list}
            {...props}
        />
  </View>
)
}


const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 12,
    },
    input: {
      backgroundColor: theme.colors.surface,
    }
}
)