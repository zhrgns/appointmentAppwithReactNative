import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    FlatList,
    ScrollView,
} from "react-native";
import Button from "../components/button/Button";
import Colors from "../utils/Colors";

const deviceSize = Dimensions.get("window");

export default function ServiceDetailScreen({ route, navigation }) {
    const { item } = route.params;

    const goToBookingScreen = (item) => {
        navigation.navigate("ServiceBookingScreen", { item });
    };

    return (
        <View style={styles.out_container}>
            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.header_container}>
                    <Image
                        style={styles.image_container}
                        source={require("../../assets/user-profile.png")}
                    />
                    <View style={styles.title_container}>
                        <Text style={styles.title}>
                            {item.firstName} {item.lastName}
                        </Text>
                        <Text style={styles.desc}>
                            {item.expert_area}, {item.district}
                        </Text>
                    </View>
                </View>
                {/* Body */}
                <View style={styles.body_container}>
                    <View style={styles.title_container}>
                        <Text style={styles.about}>About</Text>

                        <View style={styles.skills_container}>
                            {item.skills.map((skill, index) => (
                                <Text key={index} style={styles.chips}>
                                    {skill}
                                </Text>
                            ))}
                        </View>

                        <Text style={styles.desc}>LOREM IPSUM</Text>
                    </View>
                </View>

                <View style={styles.detail_container}>
                    <View style={styles.detail}>
                        <Text style={styles.detail_text}>
                            {" "}
                            {item.experience}+ Deneyim
                        </Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.detail_text}>
                            {item.numberOf_books} Tamamlanmış Randevu
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.button_container}>
                <Button
                    text={"Randevu Al"}
                    onPress={() => goToBookingScreen(item)}
                />
            </View>
        </View>
    );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    out_container: { flex: 1 },
    container: {
        flexGrow: 1,
        marginTop: 48,
        paddingHorizontal: 24,
    },
    header_container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 24,
        padding: 16,
        borderRadius: 20,
        justifyContent: "center",
    },
    body_container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 24,
        padding: 16,
        borderRadius: 20,
        justifyContent: "center",
    },
    image_container: {
        marginRight: 16,
        borderRadius: 50,
        overflow: "hidden",
        width: 100,
        height: 100,
    },
    title_container: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    button_container: {
        flexDirection: "row",
        marginBottom: 16,
        marginHorizontal: 24,
    },
    title: {
        fontSize: 24,
        fontFamily: "Mulish-Light",
    },
    about: {
        fontSize: 20,
        fontFamily: "Mulish-Light",
    },
    detail_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
        justifyContent: "space-between",
    },
    skills_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 16,
        flexWrap: "wrap",
    },
    detail: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        marginHorizontal: 12,
        height: windowWidth / 3,
        justifyContent: "center",
        backgroundColor: Colors.color_white,
    },
    detail_text: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Mulish-Medium",
    },
    chips: {
        alignSelf: "flex-start",
        borderRadius: 20,
        padding: 8,
        margin: 4,
        borderRadius: 16,
        fontFamily: "Mulish-Light",
        backgroundColor: Colors.color_blue,
        color:Colors.color_white
    },
    desc: {
        fontSize: 14,
        fontWeight: "300",
        padding: 8,
        fontFamily: "Mulish-Light",
    },
});
