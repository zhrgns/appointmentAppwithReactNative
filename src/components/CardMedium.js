import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
} from "react-native";
// import { useFonts } from "expo-font";

export default function CardMedium(props) {
    // const [fontsLoaded] = useFonts({
    //     "Mulish-Light": require('../../assets/fonts/Mulish-Light.ttf'),
    //     "Mulish-Medium": require('../../assets/fonts/Mulish-Medium.ttf'),
    //   });

    return (
        <TouchableWithoutFeedback onPress={props.onSelect}>
            <View style={styles.card}>
                <Image source={props.image_source} style={styles.image} />
                <View style={styles.text_container}>
                    <View style={styles.title_container}>
                        <Text style={styles.title}>
                            {props.service.firstName} {props.service.lastName}
                        </Text>
                        <Text style={styles.desc}>
                            {props.service.expert_area},{" "}
                            {props.service.district}
                        </Text>
                    </View>
                    <View style={styles.detail_container}>
                        <Text style={styles.desc}>
                            {props.service.numberOf_books} T. Randevu, {props.service.experience} Yıl Deneyim
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 24,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: "#fff",
        padding: 16,
        borderColor: "#e6e6e6",
        borderWidth: 2,
        flexDirection: "row",
        borderRadius: 20,
    },
    image: {
        marginRight: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden",
        width: 100,
        height: 100,
    },
    text_container: {
        flex: 1,
    },
    title_container: {
        flex: 1,
    },
    detail_container_container: {
        flex: 1, flexDirection:"row-reverse"
    },
    title: {
        fontSize: 18,
        fontFamily: "Mulish-Medium"
    },
    desc: {
        fontSize: 14,
        fontWeight: "300",
    },
});
