import React from "react";
import {StyleSheet, TextInput, View } from "react-native";
import {colors} from "../styles/Theme";


export default function InputBar(props) {

    return (
        <View style={styles.container}>
            <TextInput style= {{fontSize:14, fontFamily: "Mulish-Medium"}} 
            placeholder={props.placeholder}
            placeholderTextColor={colors.color_gray}
            onChangeText={props.onType}
            value = {props.value}
            secureTextEntry={props.isSecure}
             />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding:16,
        borderColor: colors.color_light_gray,
        backgroundColor:colors.color_light_gray,
        borderWidth:1,
        borderRadius:20,
        marginVertical:8,
    }
});
