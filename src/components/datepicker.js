import React, {useState} from 'react'
import { Modal, styleSheet, Text, TouchableHighlight, View, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

import moment from 'moment'; 

const CustomDatePicker = (props)  => {
    const {textStyle} = props;
    const [ Date, setDate ] = useState(moment());
    const [show, setShow] = useState(false)



    return (
        <TouchableHighlight
            activeOpacity={0}
            onPress={() => setShow(true)}>
            <View>
                <Text></Text>
            </View>
            
        </TouchableHighlight>
    )
};

export default CustomDatePicker; 