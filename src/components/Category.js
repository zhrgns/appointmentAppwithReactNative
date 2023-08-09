import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../utils/Colors";

const Category = ({ category, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                isSelected ? styles.selectedButton : null,
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.ButtonText,
                    isSelected ? styles.selectedButtonText : null,
                ]}
            >
                {category}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    categoryButton: {
        paddingVertical: 10,
        paddingHorizontal:8,
        marginHorizontal: 8,
        borderRadius: 10,
        borderColor: Colors.color_blue,
        borderWidth: 1,
    },
    selectedButton: {
        backgroundColor: Colors.color_blue,
    },
    ButtonText: {
        color: Colors.color_blue,
    },
    selectedButtonText: {
        color: "white",
        fontFamily: "Mulish-Medium"
    },
});

export default Category;
