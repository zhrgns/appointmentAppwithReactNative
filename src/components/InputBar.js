import React from "react";
import {StyleSheet, TextInput, View } from "react-native";


export default function InputBar(props) {

    return (
        <View style={styles.container}>
            <TextInput style= {{fontSize:14}} 
            placeholder={props.placeholder}
            placeholderTextColor="#d9d9d9"
            onChangeText={props.onChangeText}
             />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding:16,
        borderColor:"#e6e6e6",
        borderWidth:2,
        borderRadius:20,
        marginVertical:12,
    }
});
