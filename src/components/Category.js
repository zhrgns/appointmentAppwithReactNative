import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";

const Category = ({ category, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.button, isSelected ? styles.selectedButton : null]}
            onPress={onPress}
        >
            <Ionicons
                name={category.icon}
                size={24}
                color={
                    isSelected 
                    ? Colors.color_white 
                    : Colors.color_blue
                }
                style={styles.icon}
            />
            <Text style={[
                styles.text, 
                isSelected ? styles.selectedText : null]}>
                {category.name}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginHorizontal: 8,
        borderRadius: 10,
        borderColor: Colors.color_blue,
        borderWidth: 1,
    },
    selectedButton: {
        backgroundColor: Colors.color_blue,
    },
    text: {
        color: Colors.color_blue,
    },
    selectedText: {
        color: Colors.color_white,
        fontFamily: "Mulish-Medium",
    },
    icon: {
        marginRight: 4,
    },
});

export default Category;
