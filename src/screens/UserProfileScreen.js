import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { Feather } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

export default function UserProfileScreen({ navigation }) {
    //sing out user
    function handleSignOut() {
        const auth = getAuth(app);

        signOut(auth)
            .then((res) => {
                showMessage({ message: "Oturum sonlandı", type: "success" });
                goToLogin();
            })
            .catch((err) => console.log(err));
    }

    // Navigation

    function goToLogin() {
        navigation.navigate("LoginScreen");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> User Info </Text>

            <TouchableOpacity
                style={styles.logout_container}
                onPress={handleSignOut}
            >
                <Text style={styles.text}>Çıkış Yap </Text>

                <Feather
                    style={styles.icon}
                    name="log-out"
                    size={24}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 48,
    },
    logout_container: {
        flexDirection: "row",
        margin: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        flex: 1,
        padding: 16,
        marginHorizontal: 24,
        marginVertical: 32,
        fontSize: 30,
        fontFamily: "Mulish-Medium",
    },
    icon: {
        padding: 4,
    },
    text: {
        padding: 8,
        fontSize: 18,
        fontFamily: "Mulish-Medium",
    },
});
