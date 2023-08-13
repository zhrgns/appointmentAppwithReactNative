import { getAuth } from "firebase/auth";
import React from "react";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { colors } from "../styles/Theme";
import { child, get, getDatabase, ref } from "firebase/database";
import parseContentData from "../utils/ParseContentData";
import CardAppointmentSmall from "../components/CardAppointmentSmall";
import { sortAppointmentsByDateAndTime } from "../utils/CalendarUtils";


const userInfo = {
    id: 0,
    firstName: "Zehra",
    lastName: "Güneş",
    district: "Ataşehir",
};

export default function NotificationsScreen({ navigation }) {
    const [appointmentList, setAppointmentList] = useState([]);

    const [userAuth, setUserAuth] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    // //Kullanıcı oturumu
    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            setUserAuth(!!userAuth);
        });
    }, []);

    //randevu listesi getirme
    useEffect(() => {
        if (userAuth) {
            const dbRef = ref(getDatabase());

            get(child(dbRef, "userAppointments/" + user.uid))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const getList = parseContentData(snapshot.val());

                        const servicePromises = getList.map((appointment) =>
                            fetchServiceInfo(appointment.serviceId)
                        );

                        // Tüm promise'ların sonuçlarını bekle
                        Promise.all(servicePromises)
                            // Randevu verilerine sağlayıcı bilgilerini ekle
                            .then((serviceInfos) => {
                                const updateAppointmentList = getList.map(
                                    (appointment, index) => ({
                                        ...appointment,
                                        serviceInfo: serviceInfos[index],
                                    })
                                );
                                // Tarih ve saatine göre sıralanmış randevu listesini güncelle
                                setAppointmentList(
                                    sortAppointmentsByDateAndTime(
                                        updateAppointmentList
                                    )
                                );

                                setIsReady(true);
                            });
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {});
        } else {
            setAppointmentList([]);
            setTimeout(() => {
                setIsReady(true);
            }, 2000);
        }
    }, [userAuth]); // User auth dependecy

    function fetchServiceInfo(id) {
        const dbRef = ref(getDatabase(), "services/" + id);

        return get(dbRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // console.log(snapshot.val())
                    return snapshot.val();
                } else {
                    return null;
                }
            })
            .catch(() => {
                console.error(error);
                return null;
            });
    }

    //NAVIGATION
    function goToCalendar() {
        navigation.navigate("CalendarScreen");
    }


    return (
        <ScrollView>
            {isReady && (
                <View style={styles.container}>
                    <View style={styles.app_container}>
                        {appointmentList.length === 0 ? (
                            ""
                        ) : (
                            <View style={styles.list_container}>
                                <Text style={styles.text}>Bildirimlerim</Text>
                                <View>
                                    {appointmentList
                                        .slice(0, 2)
                                        .map((appointment) => (
                                            <CardAppointmentSmall
                                                appointment={appointment}
                                                serviceInfo={
                                                    appointment.serviceInfo
                                                }
                                                key={appointment.id}
                                                onPress={goToCalendar}
                                            />
                                        ))}
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            )}
            {!isReady && (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" color={colors.color_blue} />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 48,
    },
    top_container: {
        paddingHorizontal: 24,
    },
    card_container: {
        marginVertical: 16,
        backgroundColor: colors.color_blue,
        borderRadius: 20,
        padding: 16,
    },
    header_container: {
        marginVertical: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    welcome_container: {
        marginTop: 48,
        flexDirection: "row",
        alignItems: "center",
    },
    search_container: {
        flex: 1,
        paddingBottom: 16,
    },
    app_container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    list_container: {
        flex: 1,
    },
    header_text: {
        fontSize: 34,
        fontFamily: "Mulish-Medium",
        color: colors.color_blue,
        flex: 1,
    },
    welcome_text: {
        paddingHorizontal: 8,
        fontSize: 24,
        color: colors.color_white,
        fontFamily: "Mulish-Medium",
    },
    text: {
        flex: 1,
        fontSize: 18,
        paddingVertical: 16,
        fontFamily: "Mulish-Medium",
    },
    detail_text: {
        flex: 1,
        flexWrap: "wrap",
        fontSize: 16,
        paddingVertical: 16,
        paddingHorizontal: 8,
        color: colors.color_white,
        fontFamily: "Mulish-Medium",
    },
    welcome_text_bold: {
        color: colors.color_white,
        fontSize: 24,
        fontFamily: "Mulish-Bold",
    },
    icon: {
        color: colors.color_blue,
    },
    loading_container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
});
