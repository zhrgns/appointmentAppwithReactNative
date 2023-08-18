import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import { colors, sizes } from "../styles/Theme";
import { Ionicons } from "@expo/vector-icons";

const CARD_WIDTH = sizes.width - 100;
const CARD_HEIGHT = 150;

export const CardCarousel = ({ list, onSelectCategory}) => {
    return (
        <FlatList
            data={list}
            horizontal
            snapToInterval={CARD_WIDTH + 24}
            decelerationRate={"fast"}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.icon}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity
                        style={{
                            marginLeft: index === 0 ? 0 : 24,
                            marginRight: index === list.length - 1 ? 24 : 0,
                            marginVertical:16
                        }}
                        onPress={onSelectCategory}
                    >
                        <View style={styles.card}>
                            <View style={styles.box}>
                                <Ionicons
                                    name={item.icon}
                                    size={36}
                                    color={colors.color_white}
                                    style={styles.icon}
                                />
                                <View style={styles.title_box}>
                                    <Text style={styles.category}>
                                        {item.name},
                                    </Text>
                                    <Text style={styles.count}>
                                        {item.count} Hizmetveren
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 20,
        backgroundColor: colors.color_light_gray,
        shadowColor: colors.color_gray,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 6,
    },
    title_box: {
        left:24,
        top:CARD_HEIGHT-75,
        flex: 1,
        position: "absolute",
    },
    category: {
        fontSize: 24,
        fontFamily: "Mulish-Medium",
        color: colors.color_white,
    },
    count: {
        fontSize: 18,
        fontFamily: "Mulish-Light",
        color: colors.color_white,
    },
    icon: {
        left:24,
        position: "absolute",
        top:CARD_HEIGHT-115
    }
});
