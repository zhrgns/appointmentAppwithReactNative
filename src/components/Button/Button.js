import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import styles from "./Button.style";

export default function Button({onPress, loading, text, theme = "primary"}) {
    return (
        <TouchableOpacity
            style={styles[theme].container}
            onPress={onPress}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator style= {styles[theme].activity_icon} color="white" />
            ) : (
                <Text style={styles[theme].text}>{text}</Text>
            )}
        </TouchableOpacity>
    );
}
