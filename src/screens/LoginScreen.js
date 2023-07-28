import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Button from "../components/Button";
import InputBar from "../components/InputBar";

export default function ProfileScreen({ navigation }) {
    //login mock-up
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit() {
        if (!username || !password) {
            Alert.alert("Login Message", "Bilgiler Boş Bırakılamaz!");
            console.log("Hatalı Deneme")
        } else {
            const user = {
                username,
                password,
            };
            Alert.alert("Giriş Başarılı", "Anasayfaya yönlendiriliyorsunuz!");
            navigation.navigate("Home",{user});
        }
    }

    // Navigation
    function goToMemberSign() {
        navigation.navigate("SignUpScreen");
        console.log(navigation);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}> Giriş Yapın </Text>
            <View style={styles.input_container}>
                <InputBar
                    placeholder={"Kullanıcı Adı"}
                    onChangeText={setUsername}
                />
                <InputBar placeholder={"Parola"} onChangeText={setPassword} />
            </View>
            <View style={styles.button_container}>
                <Button text="Kaydol" onPress={goToMemberSign} />
                <Button text="Giriş Yap" onPress={handleSubmit} />
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
        marginVertical: 32,
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
