import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import  {colors} from "../styles/Theme";
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
                size={36}
                color={
                    isSelected 
                    ? colors.color_white 
                    : colors.color_primary
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
        marginVertical:8,
        borderRadius: 10,
        borderColor: colors.color_primary,
        borderWidth: 1,
        width: windowWidth / 4,
        height: windowWidth / 4,
        justifyContent:"center"
    },
    selectedButton: {
        backgroundColor: colors.color_primary,
    },
    text: {
        color: colors.color_primary,
        fontSize:14,
        fontFamily: "Mulish-Medium",
        textAlign:  "center"
    },
    selectedText: {
        color: colors.color_white,
        fontFamily: "Mulish-Medium",
    },
    icon: {
        flex:1,
    },
});

export default Category;
