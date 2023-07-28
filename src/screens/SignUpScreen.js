import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "../components/Button";
import InputBar from "../components/InputBar";

export default function SignUpScreen() {


    return (
        <View style={styles.container}>
            <Text style={styles.text}> Kayıt Olun </Text>
            <View style={styles.input_container}>
                <InputBar placeholder={"Kullanıcı Adı"} />
                <InputBar placeholder={"Email Adresi"} />
                <InputBar placeholder={"Parola"} />
            </View>
            <View style={styles.button_container}>
                <Button text="TAMAMLA"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 48,
    },
    text: {
        marginHorizontal: 24,
        marginVertical:32,
        fontSize: 30,
    },
    input_container: {
        marginHorizontal: 24,
    },
    button_container: {
        flexDirection: "row",
        margin: 16,
    },
});
