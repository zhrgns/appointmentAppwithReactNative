import React from "react";
import {StyleSheet, TextInput, View } from "react-native";
import Colors from "../utils/Colors";


export default function InputBar(props) {

    return (
        <View style={styles.container}>
            <TextInput style= {{fontSize:14, fontFamily: "Mulish-Medium"}} 
            placeholder={props.placeholder}
            placeholderTextColor="#d9d9d9"
            onChangeText={props.onType}
            value = {props.value}
            secureTextEntry={props.isSecure}
             />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding:10,
        borderColor: Colors.color_light_gray,
        borderWidth:2,
        borderRadius:20,
        marginVertical:8,
    }
});
