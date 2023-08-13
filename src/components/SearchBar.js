import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import {colors} from "../styles/Theme";
import { Feather } from "@expo/vector-icons";

export default function SearchBar(props) {
    return (
        <View style={styles.container}>
            <Feather
                name="search"
                size={20}
                color={colors.color_light_gray}
                style={styles.icon}
            />
            <TextInput placeholder={props.placeholder_text} onChangeText={props.onSearch} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.color_white,
        padding: 12,
        borderRadius: 20,
        flexDirection: "row",
        shadowColor: colors.color_gray,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 6,
    },
    icon: { paddingEnd: 8 }
});
