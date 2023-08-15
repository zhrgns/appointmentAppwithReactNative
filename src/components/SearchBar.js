import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/Theme";
import { Feather } from "@expo/vector-icons";

export default function SearchBar(props) {
    const [isSearchFocused, setSearchFocused] = useState(false);

    const handleSearchFocus = () => {
        setSearchFocused(true);
        props.onSearch("");
    };

    const handleSearchBlur = () => {
        setSearchFocused(false);
    };
    return (
        <TouchableOpacity style={styles.container}>
            <Feather
                name="search"
                size={20}
                color={colors.color_light_gray}
                style={styles.icon}
            />
            <TextInput
                style={styles.input_line}
                placeholder={props.placeholder_text}
                onChangeText={props.onSearch}
                onBlur={handleSearchBlur}
                onFocus={handleSearchFocus}
            />
        </TouchableOpacity>
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
    icon: { paddingEnd: 8 },
    input_line: {
        flex: 1,
    },
});
