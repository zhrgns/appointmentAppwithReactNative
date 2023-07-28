import React from "react";
import {StyleSheet, TextInput, View } from "react-native";
// import { useFonts } from "expo-font";

export default function SearchBar(props) {
    // const [fontsLoaded] = useFonts({
    //     "Mulish-Light": require('../../assets/fonts/Mulish-Light.ttf'),
    //     "Mulish-Medium": require('../../assets/fonts/Mulish-Medium.ttf'),
    //   });


    return (
        <View style={styles.container}>
            <TextInput placeholder="Arama" onChangeText={props.onSearch}/>
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
    },
});
