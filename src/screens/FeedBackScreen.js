import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FeedBackScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Text style={styles.header_text}>HEllo</Text>
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
