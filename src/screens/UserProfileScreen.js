import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { Feather } from "@expo/vector-icons";
import CardSmall from "../components/CardSmall";
import { showTopMessage } from "../utils/ErrorHandler";
import Colors from "../utils/Colors";

export default function UserProfileScreen({ navigation }) {
    const userInfo = {
        id: 0,
        firstName: "Zehra",
        lastName: "Güneş",
        district: "Ataşehir",
    };
    //sing out user
    function handleSignOut() {
        const auth = getAuth(app);

        signOut(auth)
            .then((res) => {
                showTopMessage("Oturum sonlandı", "success");
                goToLogin();
            })
            .catch((err) => console.log(err));
    }

    // Navigation

    function goToLogin() {
        navigation.navigate("LoginScreen");
    }

    function goToBookingHistory() {
        navigation.navigate("BookingHistoryScreen");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header_text}>Profilim</Text>

            <View style={styles.section_container}>
                <TouchableWithoutFeedback>
                    <View style={styles.card}>
                        <Image
                            source={require("../../assets/user-profile.png")}
                            style={styles.image}
                        />

                        <View style={styles.text_container}>
                            <View style={styles.title_container}>
                                <Text style={styles.title}>
                                    {userInfo.firstName} {userInfo.lastName}
                                </Text>
                                <Text style={styles.desc}>
                                    {userInfo.district}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View />

                <CardSmall iconName={"user"} text={"Hesap Bilgilerim"}  />
                <CardSmall iconName={"list"} text={"Geçmiş Randevularım"} onPress={goToBookingHistory} />
                <CardSmall iconName={"message-square"} text={"Geri Bildirim"} />
            </View>
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
    card: {
        flexDirection: "row",
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 24,
        marginBottom: 16,
        backgroundColor: Colors.color_white,
        padding: 16,
    },
    image: {
        marginRight: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden",
        width: 72,
        height: 72,
    },
    text_container: {
        flex: 1,
    },
    title_container: {
        flex: 1,
        justifyContent:"center"
    },
    title: {
        fontSize: 18,
        fontFamily: "Mulish-Medium",
    },
    desc: {
        fontSize: 14,
        fontFamily: "Mulish-Light",
        color: Colors.color_gray,
    },
    section_container: {
        flex: 1,
    },
    logout_container: {
        flexDirection: "row",
        margin: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    header_text: {
        marginHorizontal: 24,
        marginVertical: 16,
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
