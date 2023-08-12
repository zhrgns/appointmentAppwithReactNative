import { child, get, getDatabase, ref, remove } from "firebase/database";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";
import parseContentData from "../utils/ParseContentData";
import { getAuth } from "firebase/auth";
import Colors from "../utils/Colors";
import CardAppointment from "../components/CardAppointment";
import { showTopMessage } from "../utils/ErrorHandler";
import { sortAppointmentsByDateAndTime } from "../utils/CalendarUtils";

export default function CalendarScreen() {
    const [loading, setLoading] = useState(true);
    const [appointmentList, setAppointmentList] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;

    //get user appointments from database

    useEffect(() => {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "userAppointments/" + user.uid))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const getList = parseContentData(snapshot.val());

                    const servicePromises = getList.map((appointment) =>
                        fetchServiceInfo(appointment.serviceId)
                    );

                    // Tüm promise'ların sonuçlarını bekleyin
                    Promise.all(servicePromises)
                        // Randevu verilerine sağlayıcı bilgilerini ekleyin
                        .then((serviceInfos) => {
                            const updateAppointmentList = getList.map(
                                (appointment, index) => ({
                                    ...appointment,
                                    serviceInfo: serviceInfos[index],
                                })
                            );
                            // Tarih ve saatine göre sıralanmış randevu listesini güncelleyin
                            setAppointmentList(
                                sortAppointmentsByDateAndTime(
                                    updateAppointmentList
                                )
                            );
                        });
                } else {
                    showTopMessage("Gösterecek veri yok", "info");
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [appointmentList]); // Burada appointmentList'i bağımlılık olarak ekledik

    const fetchServiceInfo = (id) => {
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
    };

    const handleCancel = (appointment) => {
        Alert.alert(
            "Randevu iptali",
            "Randevunuz iptal edilecek, onaylıyor musunuz?",
            [
                {
                    text: "Vazgeç",
                    style: "cancel",
                },
                {
                    text: "İptal Et",
                    onPress: () => {
                        const appointmentsRef = ref(
                            getDatabase(),
                            "userAppointments/" +
                                user.uid +
                                "/" +
                                appointment.id
                        );

                        remove(appointmentsRef)
                            .then(() => {
                                showTopMessage("Randevu silindi!", "success");
                            })
                            .catch((error) => {
                                showTopMessage(
                                    "Randevu silinirken hata oluştu !",
                                    "info"
                                );
                            });
                    },
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header_text}>Randevularım</Text>
            {loading ? (
                <ActivityIndicator
                    style={styles.loadingIndicator}
                    size="large"
                    color={Colors.color_blue}
                />
            ) : (
                <View style={styles.list_container}>
                    {appointmentList.length === 0 ? (
                        <Text style={styles.emptyViewText}>
                            Randevunuz Bulunmuyor!
                        </Text>
                    ) : (
                        <View>
                            {appointmentList.map((appointment) => (
                                <CardAppointment
                                    appointment={appointment}
                                    serviceInfo={appointment.serviceInfo}
                                    key={appointment.id}
                                    onPressCancel={() =>
                                        handleCancel(appointment)
                                    }
                                />
                            ))}
                        </View>
                    )}
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
    header_text: {
        marginHorizontal: 24,
        marginVertical: 16,
        fontSize: 30,
        fontFamily: "Mulish-Medium",
    },
    list_container: {
        flex: 1,
        justifyContent: "center",
    },
    emptyViewText: {
        fontFamily: "Mulish-Medium",
        fontSize: 24,
        alignItems: "center",
        marginHorizontal: 24,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
