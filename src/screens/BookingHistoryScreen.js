import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BookingHistoryScreen({ route }) {
    let user = route?.params?.user; // Optional chaining ile route ve params objelerinin varlığını kontrol ediyoruz

    const welcomeText =
        user && user.username ? `Hoşgeldiniz, ${user.username}` : "Hoşgeldiniz";



    return (
        <View style={styles.container}>
            <Text style={styles.header_text}>{welcomeText} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 48,
    },
    header_text: {
        marginHorizontal: 24,
        marginVertical: 32,
        fontSize: 30,
        fontFamily: "Mulish-Medium",
    },
});
