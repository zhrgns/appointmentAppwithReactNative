import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function UserInfosScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.header_text}>Hello</Text>
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
    text: {
        flex: 1,
        fontSize: 18,
        paddingVertical: 16,
        fontFamily: "Mulish-Medium",
    },
});
