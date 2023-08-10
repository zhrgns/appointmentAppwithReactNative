import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../utils/Colors";

const windowWidth = Dimensions.get("window").width;

const TimeSlot = (timeslot,onPress) => {
    return (
        <TouchableOpacity
            style={[styles.container, isSelected ? styles.selectedButton : null]}
            onPress={onPress}>
            <Text style={[
                styles.text, 
                isSelected ? styles.selectedText : null]}>
                {timeslot.apptime}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:"row",
        alignItems: "center",
        padding: 16,
        marginHorizontal: 8,
        borderRadius: 20,
        borderColor: Colors.color_blue,
        borderWidth: 1,
        width: windowWidth / 2,
        justifyContent:"center"
    },
    selectedButton: {
        backgroundColor: Colors.color_blue,
    },
    text: {
        justifyContent:"center",
        color: Colors.color_blue,
        fontSize:14,
        fontFamily: "Mulish-Medium",
    },
    selectedText: {
        justifyContent:"center",
        color: Colors.color_white,
        fontFamily: "Mulish-Medium",
    },
});

export default TimeSlot;
