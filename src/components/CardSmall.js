import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { colors } from "../styles/Theme";
import { Feather } from "@expo/vector-icons";

export default function CardSmall({ text, iconName , onSelect}) {
    return (
        <TouchableOpacity onPress={onSelect}>
            <View style={styles.card}>
                <View style={styles.icon_container}>
                    <Feather
                        style={styles.icon}
                        name={iconName}
                        size={24}
                        color="black"
                    />
                </View>
                <View style={styles.section_container}>
                    <Text style={styles.section_text}>{text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 24,
        marginBottom: 16,
        backgroundColor: colors.color_white,
        justifyContent: "center",
        
    },
    section_container: {
        flex: 1,
        justifyContent:"center"
    },
    icon_container: {
    },
    icon: {
        padding: 4,
    },
    section_text: {
        fontSize: 14,
        fontFamily: "Mulish-Medium",
    },
});
