import { View, StyleSheet, Text, Image, ScrollView, Alert } from "react-native";
import Button from "../components/button/Button";
import React, { useState,useEffect } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { colors } from "../styles/Theme";
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, get, child } from "firebase/database";
import { showTopMessage } from "../utils/ErrorHandler";
import TimeSlot from "../components/TimeSlot";
import parseContentData from "../utils/ParseContentData";
import * as Notifications from "expo-notifications";


export default function ServiceBookingScreen({ route, navigation }) {
    const { item } = route.params;

    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const today = moment().format("YYYY-MM-DD");
    const threeMonthsLater = moment().add(3, "months").format("YYYY-MM-DD");

    const auth = getAuth();
    const user = auth.currentUser;

    const [apptimeList, setApptimeList] = useState([]);

    //notification
    useEffect(() => {
        // Bildirim ayarlarını tanımlama
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });
    }, []);

    const handleNotification = () => {
        console.log("bildirim")
        // Bildirim oluşturma
        const notificationContent = {
            title: "Yaklaşan randevunuz",
            body: `Randevunuz saatinde.`,
        };
        Notifications.scheduleNotificationAsync({
            content: notificationContent,
            trigger: {
                seconds: 10, // Kaç saniye sonra bildirimin gösterileceği
            },
        });
    };

    //get times from database
    useEffect(() => {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "times"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const apptimeList = parseContentData(snapshot.val());
                    setApptimeList(apptimeList);
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
    }, []);

    const handleBooking = () => {
        if (selectedDate && selectedTime && user) {
            Alert.alert(
                "Randevu Oluşturma",
                "Randevunuz oluşturulacakonaylıyor musunuz ?",
                [
                    {
                        text: "Vazgeç",
                        style: "cancel",
                    },
                    {
                        text: "Tamamla",
                        onPress: () => {
                            pushAppointment();
                        },
                    },
                ]
            );
        } else {
            if (!user) {
                showTopMessage("Kullanıcı girişi yapmadınız", "success");
                goToLoginScreen();
            } else if (!selectedDate || !selectedTime) {
                showTopMessage("Lütfen bir gün ve bir saat seçin.", "info");
            }
        }
    };

    const pushAppointment = () => {
        const userId = user.uid;
        const serviceId = item.id;
        const appType = item.expert_area;
        const bookedDate = selectedDate;
        const bookedTime = selectedTime;

        const appointmentsRef = ref(
            getDatabase(),
            "userAppointments/" + user.uid
        );

        push(appointmentsRef, {
            userId,
            serviceId,
            appType,
            bookedDate,
            bookedTime,
        })
            .then(() => {
                showTopMessage("Randevunuz oluşturuldu!", "success");

                handleNotification();
                goToCompletedScreen();
                setSelectedTime(null);
                setSelectedDate(null);
            })
            .catch((error) => {
                showTopMessage("Bir hata oluştu.", "info");
                setSelectedTime(null);
                setSelectedDate(null);
            });
    };

    const onDateSelect = (day) => {
        setSelectedDate(day.dateString);
    };

    const onTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const goToCompletedScreen = () => {
        navigation.navigate("SearchScreen");
    };

    const goToLoginScreen = () => {
        navigation.navigate("LoginScreen");
    };

    return (
        <View style={styles.out_container}>
            <ScrollView nestedScrollEnabled={true} style={styles.container}>
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

                <View style={styles.text_container}>
                    <Text style={styles.subTitle}>Gün Seçin:</Text>
                </View>

                <Calendar
                    style={styles.calendar_container}
                    onDayPress={onDateSelect}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: colors.color_blue,
                            selectedTextColor: colors.color_white,
                        },
                    }}
                    minDate={today}
                    maxDate={threeMonthsLater}
                />

                {selectedDate && (
                    <View style={styles.bottom_container}>
                        <View style={styles.text_container}>
                            <Text style={styles.subTitle}>Saat Seçin:</Text>
                        </View>
                        <View style={styles.time_container}>
                            {apptimeList.map((time) => (
                                <TimeSlot
                                    key={time.id.toString()}
                                    time={time}
                                    onPress={onTimeSelect}
                                    isSelected={selectedTime === time.apptime}
                                />
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>
            <View style={styles.button_container}>
                <Button text={"Tamamla"} onPress={handleBooking} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    out_container: { flex: 1 },
    container: {
        flexGrow: 1,
        marginTop: 48,
        paddingHorizontal: 24,
    },
    header_container: {
        flexDirection: "row",
        backgroundColor: colors.color_white,
        marginTop: 24,
        padding: 16,
        borderRadius: 20,
        justifyContent: "center",
    },

    calendar_container: {
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
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
    text_container: {
        flex: 1,
        flexDirection: "row",
    },
    time_container: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 16,
        backgroundColor: colors.color_white,
        borderRadius: 20,
        justifyContent: "space-between",
    },
    bottom_container: {
        flex: 1,
        marginBottom: 24,
    },
    button_container: {
        flexDirection: "row",
        marginBottom: 16,
        paddingHorizontal: 24,
    },

    title: {
        fontSize: 24,
    },
    subTitle: {
        fontSize: 18,
        paddingVertical: 16,
    },
    desc: {
        fontSize: 14,
        fontWeight: "300",
        paddingVertical: 8,
    },
});
