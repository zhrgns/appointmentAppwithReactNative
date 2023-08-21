import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../styles/Theme";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function UploadImage() {
    const [image, setImage] = useState(null);

    const addImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        } else {
            alert("You did not select any image.");
        }
    };

    return (
        <View style={styles.container}>
            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : (
                <Image source={require("../../assets/user-profile.png")} style={styles.image} />
            )}
            <View style={styles.upload_button_container}>
                <TouchableOpacity
                    onPress={addImage}
                    style={styles.upload_button}
                >
                    <Text style={styles.desc}>
                        {image ? "Düzenle" : "Yükle"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden",
        width: 72,
        height: 72,
    },
    upload_button: {
        alignItems: "center",
        justifyContent: "center",
    },
    upload_button_container: {
        opacity: 0.5,
        position: "absolute",
        right: 0,
        bottom: 0,
        backgroundColor: colors.color_gray,
        width: "100%",
        height: "25%",
    },
    desc: {
        fontSize: 12,
        fontFamily: "Mulish-Light",
        color: colors.color_white,
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
});
