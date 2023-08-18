import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ScrollView,
} from "react-native";
import { colors } from "../styles/Theme";
import { Ionicons } from "@expo/vector-icons";

export default function CardMedium({ service, onSelect, image_source }) {
    return (
        <TouchableWithoutFeedback onPress={onSelect}>
            <View style={styles.container}>
                <View style={styles.info_container}>
                    <Image source={image_source} style={styles.image} />
                    <View style={styles.text_container}>
                        <View style={styles.title_container}>
                            <Text style={styles.title}>
                                {service.firstName} {service.lastName}
                            </Text>
                            <Text style={styles.desc}>
                                {service.expert_area}
                            </Text>
                        </View>

                        <View style={styles.location_container}>
                            <Ionicons
                                name="ios-location-outline"
                                size={18}
                                color={colors.color_primary}
                            />
                            <Text style={styles.location}>
                                {service.district}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.skills_container}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {service.skills.map((skill, index) => (
                            <View key={index} style={styles.chip_container}>
                                <Text style={styles.chips}>{skill}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 24,
        marginVertical: 8,
        backgroundColor: colors.color_white,
        shadowColor: colors.color_light_gray,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 4,
        justifyContent: "center",
    },
    info_container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: colors.color_white,
        justifyContent: "center",
        paddingBottom: 8,
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
    location_container: {
        flexDirection: "row",
    },
    skills_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    chip_container: {
        borderRadius: 20,
        backgroundColor: colors.color_secondary,
        padding: 12,
        margin: 4,
    },
    chips: {
        alignSelf: "flex-start",
        fontFamily: "Mulish-Light",
        color: colors.color_white,
    },
    title: {
        fontSize: 18,
        fontFamily: "Mulish-Medium",
    },
    desc: {
        fontSize: 16,
        fontFamily: "Mulish-Light",
        color: colors.color_gray,
    },
    location: {
        fontSize: 16,
        fontFamily: "Mulish-Light",
        flex: 1,
        color: colors.color_primary,
        justifyContent: "center",
    },
});
