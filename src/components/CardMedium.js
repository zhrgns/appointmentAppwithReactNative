import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
} from "react-native";
import {colors} from "../styles/Theme";

export default function CardMedium({ service, onSelect, image_source }) {
    return (
        <TouchableWithoutFeedback onPress={onSelect}>
            <View style={styles.card}>
                <Image source={image_source} style={styles.image} />
                <View style={styles.text_container}>
                    <View style={styles.title_container}>
                        <Text style={styles.title}>
                            {service.firstName} {service.lastName}
                        </Text>
                        <Text style={styles.desc}>
                            {service.expert_area}, {service.district}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.desc}>
                            {service.numberOf_books} T. Randevu,{" "}
                            {service.experience} Yıl Deneyim
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
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 24,
        marginVertical: 8,
        backgroundColor: colors.color_white,
        shadowColor: colors.color_gray,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 6,
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
    },
    title: {
        fontSize: 18,
        fontFamily: "Mulish-Medium",
    },
    desc: {
        fontSize: 14,
        fontFamily: "Mulish-Light",
        color:colors.color_gray
    },
});
