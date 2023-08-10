import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

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
        alignItems: "center",
        padding: 16,
        marginHorizontal: 8,
        borderRadius: 10,
        borderColor: Colors.color_blue,
        borderWidth: 1,
        width: windowWidth / 4,
        height: windowWidth / 4,
        justifyContent:"center"
    },
    selectedButton: {
        backgroundColor: Colors.color_blue,
    },
    text: {
        color: Colors.color_blue,
        fontSize:14,
    },
    selectedText: {
        color: Colors.color_white,
        fontFamily: "Mulish-Medium",
    },
    icon: {
        flex:1,
    },
});

export default Category;
