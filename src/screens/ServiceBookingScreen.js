import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import Button from "../components/button/Button";
import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { colors } from "../styles/Theme";
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, get, child, update } from "firebase/database";
import { showTopMessage } from "../utils/ErrorHandler";
import TimeSlot from "../components/TimeSlot";
import parseContentData from "../utils/ParseContentData";
import { Ionicons } from "@expo/vector-icons";
import {
    configureNotifications,
    handleNotification,
} from "../utils/NotificationService";

export default function ServiceBookingScreen({ route, navigation }) {
    const { item } = route.params;
    const serviceId = item.id;
    const scrollViewRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeList, setTimeList] = useState([]);
    const [serviceTimeList, setServiceTimeList] = useState([]);
    const [bookedApps, setBookedApps] = useState([]);

    const today = moment().format("YYYY-MM-DD");
    const threeMonthsLater = moment().add(3, "months").format("YYYY-MM-DD");

    const auth = getAuth();
    const user = auth.currentUser;

    const getTimeListFromDatabase = async () => {
        setLoading(true);
        try {
            const dbRef = ref(getDatabase());
            const snapshot = await get(child(dbRef, "times"));

            if (snapshot.exists()) {
                const timeList = parseContentData(snapshot.val());
                setTimeList(timeList);
            } else {
                console.log("Veri yok");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getServiceAppointments = async (day) => {
        setLoading(true);
        setServiceTimeList([]);
        try {
            const appointmentsRef = ref(getDatabase(), "userAppointments");
            const snapshot = await get(appointmentsRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                let serviceBookings = [];

                Object.keys(data).forEach((user) => {
                    const userAppointments = data[user];

                    Object.keys(userAppointments).forEach((appointmentId) => {
                        const app = userAppointments[appointmentId];

                        if (
                            app.serviceId === serviceId &&
                            app.bookedDate === day
                        ) {
                            serviceBookings.push(app);
                        }
                    });
                });

                setBookedApps(serviceBookings);
                const availableTimes = timeList.map((time) => {
                    const bookedHour = serviceBookings.some(
                        (app) => app.bookedTime === time.apptime
                    );

                    return {
                        ...time,
                        isBooked: bookedHour ? true : false,
                    };
                });

                setServiceTimeList(availableTimes);
            } else {
                console.log("Veri yok");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            return true;
        }
    };

    useEffect(() => {
        configureNotifications();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await getTimeListFromDatabase();
        };

        fetchData();
    }, [selectedDate]);

    const handleBooking = () => {
        if (selectedDate && selectedTime && user) {
            Alert.alert(
                "Randevu Oluşturma",
                "Randevunuz oluşturulacak, onaylıyor musunuz ?",
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
            .then(async () => {
                showTopMessage("Randevunuz oluşturuldu!", "success");

                handleNotification(
                    "Yaklaşan randevunuz",
                    `Randevunuz ${bookedDate} , ${bookedTime} saati için oluşturuldu.`
                );
                goToCompletedScreen();
                setSelectedTime(null);
                setSelectedDate(null);
            })
            .catch((error) => {
                showTopMessage("Bir hata oluştu.", "info");
                console.error(error);
                setSelectedTime(null);
                setSelectedDate(null);
            });
    };

    const onDateSelect = async (day) => {
        try {
            setLoading(true);
            setSelectedDate(day.dateString);

            const timeListData = await getTimeListFromDatabase();
            const appsForDay = await getServiceAppointments(day.dateString);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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
            <ScrollView
                nestedScrollEnabled={true}
                ref={scrollViewRef}
                style={styles.container}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    if (!loading && scrollViewRef.current) {
                        scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                }}
            >
                {/* Header */}
                <View style={styles.header_container}>
                    <Image
                        style={styles.image_container}
                        source={require("../../assets/user-profile.png")}
                    />
                    <View>
                        <View style={styles.title_container}>
                            <Text style={styles.title}>
                                {item.firstName} {item.lastName}
                            </Text>
                            <Text style={styles.about}>
                                {item.expert_area} Uzmanı
                            </Text>
                        </View>
                        <View style={styles.location_container}>
                            <Ionicons
                                name="ios-location-outline"
                                size={18}
                                color={colors.color_primary}
                            />
                            <Text style={styles.location}>{item.district}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.text_container}>
                    <Text style={styles.subTitle}>Gün Seçin:</Text>
                </View>

                <Calendar
                    style={styles.calendar_container}
                    onDayPress={!loading ? onDateSelect : undefined}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: colors.color_primary,
                            selectedTextColor: colors.color_white,
                        },
                    }}
                    customStyle={{
                        today: {
                            todayTextColor: colors.color_primary,
                        },
                    }}
                    minDate={today}
                    maxDate={threeMonthsLater}
                />

                {selectedDate && (
                    <View style={styles.bottom_container}>
                        {loading ? (
                            <ActivityIndicator
                                style={styles.loadingIndicator}
                            />
                        ) : (
                            <>
                                <View style={styles.text_container}>
                                    <Text style={styles.subTitle}>
                                        Saat Seçin:
                                    </Text>
                                </View>
                                <View style={styles.time_container}>
                                    {serviceTimeList.map((time) => (
                                        <TimeSlot
                                            key={time.id.toString()}
                                            time={time}
                                            onPress={onTimeSelect}
                                            isSelected={
                                                selectedTime === time.apptime
                                            }
                                            isBooked={time.isBooked}
                                        />
                                    ))}
                                </View>
                            </>
                        )}
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
        marginTop: 36,
        padding: 16,
        borderRadius: 20,
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
    },
    location_container: { flexDirection: "row", paddingVertical: 8 },
    about_container: {
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
        marginBottom: 126,
        paddingHorizontal: 24,
    },
    about: {
        fontSize: 20,
        fontFamily: "Mulish-Light",
    },

    title: {
        fontSize: 24,
        fontFamily: "Mulish-Medium",
    },
    subTitle: {
        fontSize: 18,
        paddingVertical: 16,
    },
    desc: {
        fontSize: 14,
        fontFamily: "Mulish-Light",
    },
    location: {
        fontSize: 16,
        fontFamily: "Mulish-Light",
        flex: 1,
        color: colors.color_primary,
        justifyContent: "center",
    },
});
