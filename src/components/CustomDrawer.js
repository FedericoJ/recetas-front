import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#FFD700' }}>
        <ImageBackground style={{ padding: 20 }}>
          <Image source={require('../assets/user-profile.jpg')} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}>
          </Image>
          <Text style={{ color: '#fff' }}>John Wick</Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View>
        <Text>
          Ger corneta
        </Text>
      </View>
    </View>
  )
}

export default CustomDrawer