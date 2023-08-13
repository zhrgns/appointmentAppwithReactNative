import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import {colors} from "../styles/Theme";


const TimeSlot = ({ time, onPress, isSelected }) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                isSelected ? styles.selectedButton : null,
            ]}
            onPress={() => onPress(time.apptime)} // İlgili zamanı onPress fonksiyonuna geçir
        >
            <Text
                style={[styles.text, isSelected ? styles.selectedText : null]}
            >
                {time.apptime}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:24,
        paddingVertical:12,
        margin: 8,
        borderRadius: 50,
        borderColor: colors.color_blue,
        borderWidth: 1,    },
    text: {
        textAlign: "center",
        fontSize: 14,
        color: colors.color_blue,
        fontFamily: "Mulish-Medium",
    },
    selectedText: {
        justifyContent: "center",
        fontSize: 14,
        color: colors.color_white,
        fontFamily: "Mulish-Medium",
    },
    selectedButton: {
        backgroundColor: colors.color_blue,
    },
});

export default TimeSlot;
