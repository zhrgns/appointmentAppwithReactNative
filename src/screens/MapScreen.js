import React, { useEffect, useState } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { colors } from "../styles/Theme";
import { Feather } from "@expo/vector-icons";

const serviceList = [
    {
        id: 0,
        firstName: "Elif",
        lastName: "Gün",
        district: "Ataşehir",
        experience: 9,
        expert_area: "Kişisel gelişim",
        skills: ["Stres yönetimi", "Hedef belirleme", "Empati geliştirme"],
        numberOf_books: 72,
    },
    {
        id: 1,
        firstName: "Ayşe",
        lastName: "Yılmaz",
        district: "Kadıköy",
        experience: 8,
        expert_area: "Sağlık",
        skills: ["Terapi", "Stres yönetimi"],
        numberOf_books: 63,
    },
];

// İlçe isimlerine göre tahmini koordinatlar
const districtCoordinates = {
    Ataşehir: { latitude: 40.992982, longitude: 29.128364 },
    Kadıköy: { latitude: 40.981389, longitude: 29.024444 },
    // Diğer ilçeleri burada ekleyin
};

const getCoordinatesForDistrict = (district) => {
    return districtCoordinates[district] || { latitude: 0, longitude: 0 };
};

export default function MapScreen({ navigation }) {
    const [initialRegion, setInitialRegion] = useState(null);

    //get location
    useEffect(() => {
        async function getLocationAsync() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setInitialRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }

        getLocationAsync();
    }, []);

    //Navigate to detail
    const handleServiceSelect = (item) => {
        navigation.navigate("ServiceDetailScreen", { item });
    };

    return (
        <View style={styles.container}>
            {initialRegion ? (
                <MapView
                    style={styles.map}
                    provider="google"
                    initialRegion={initialRegion}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                    <Circle
                        center={{
                            latitude: initialRegion.latitude,
                            longitude: initialRegion.longitude,
                        }}
                        radius={2000}
                        strokeWidth={2}
                        strokeColor="rgba(0, 0, 255, 0.5)"
                        fillColor="rgba(0, 0, 255, 0.2)"
                    />

                    {serviceList.map((service) => (
                        <Marker
                            key={service.id}
                            coordinate={getCoordinatesForDistrict(
                                service.district
                            )}
                            title={`${service.firstName} ${service.lastName}`}
                        >
                            <Callout style={styles.callout_container}>
                                <TouchableOpacity
                                    onPress={() => handleServiceSelect(service)}>
                                    <View style={styles.callout_button}>
                                        <Text style={styles.callout_title}>
                                            {service.firstName}{" "}
                                            {service.lastName}
                                        </Text>
                                        <Text style={styles.callout_text}>
                                            {service.expert_area}
                                        </Text>
                                    </View>

                                    <Feather
                                        name="chevron-right"
                                        size={24}
                                        color={colors.color_primary}
                                    />
                                </TouchableOpacity>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            ) : (
                <></>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    callout_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.color_white,
        paddingLeft: 8,
    },
    callout_title: {
        fontFamily: "Mulish-Medium",
        paddingBottom: 12,
        fontSize: 18,
    },
    callout_text: {
        fontFamily: "Mulish-Light",
        fontSize: 13,
    },
    callout_button: {
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    },
});
