import React from "react";
import {StyleSheet, TextInput, View } from "react-native";
import Colors from "../utils/Colors";

export default function SearchBar(props) {

    return (
        <View style={styles.container}>
            <TextInput placeholder="Arama" onChangeText={props.onSearch}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.color_white,
        padding:8,
        borderColor:Colors.color_light_gray,
        borderWidth:2,
        borderRadius:20,
        marginVertical:12,
    },
});
