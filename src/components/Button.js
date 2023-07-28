import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button(props) {
    return (

        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
        );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1976d2",
        borderRadius: 20,
        marginHorizontal: 8,
        padding: 8,
        flex:1
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        textAlign:"center",
        fontSize:18,
        padding: 10,
    },
});
