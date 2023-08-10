import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Button from "../components/button/Button";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import Colors from "../utils/Colors";
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref } from "firebase/database";
import { showTopMessage } from "../utils/ErrorHandler";

export default function ServiceBookingScreen({ route, navigation }) {
    const { item } = route.params;
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const today = moment().format("YYYY-MM-DD");
    const threeMonthsLater = moment().add(3, "months").format("YYYY-MM-DD");

    const auth = getAuth();
    const user = auth.currentUser;

    const handleBooking = () => {
        if (selectedDate && selectedTime && user) {
            const userId = user.uid;
            const providerId = item.id;
            const appType = item.expert_area;
            const bookedDate = selectedDate;
            const bookedTime = selectedTime;

            const appointmentsRef = ref(getDatabase(), "userAppointments");

            push(appointmentsRef, {
                userId,
                providerId,
                appType,
                bookedDate,
                bookedTime,
            })
                .then(() => {
                    showTopMessage("Randevunuz oluşturuldu!", "success");

                    goToCompletedScreen();
                    setSelectedTime(null);
                    setSelectedDate(null);
                })
                .catch((error) => {
                    showTopMessage("Bir hata oluştu.", "info");
                    setSelectedTime(null);
                    setSelectedDate(null);
                });
        } else {
            if (!user) {
                showTopMessage("Kullanıcı girişi yapmadınız", "success");
                goToLoginScreen();
            } else if (!selectedDate || !selectedTime) {
                showTopMessage("Lütfen bir gün ve bir saat seçin.", "info");
            }
        }
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
            <ScrollView style={styles.container}>
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

                <Text style={styles.subTitle}>Gün Seçin:</Text>

                {/* Calendar */}
                <Calendar
                    style={styles.calendar_container}
                    onDayPress={onDateSelect}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: Colors.color_blue,
                            selectedTextColor: Colors.color_white,
                            
                        },
                    }}
                    minDate={today}
                    maxDate={threeMonthsLater}
                />
                {/* Visible when a day has chosen */}
                {selectedDate && (
                    <View>
                        <Text style={styles.subTitle}>Saat Seçin:</Text>

                        <View style={styles.date_container}>
                            <TouchableOpacity
                                style={[
                                    selectedTime === "09:00 - 10:00" &&
                                        styles.selectedTime,
                                ]}
                                onPress={() => onTimeSelect("09:00 - 10:00")}
                            >
                                <Text>09:00 - 10:00</Text>
                            </TouchableOpacity>
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
        backgroundColor: Colors.color_white,
        marginTop: 24,
        padding: 16,
        borderRadius: 20,
        borderColor: Colors.color_light_gray,
        borderWidth: 2,
        justifyContent: "center",
    },
    date_container: {
        backgroundColor: Colors.color_white,
        flexDirection: "row",
        padding: 16,
        borderRadius: 20,
        borderColor: Colors.color_light_gray,
        borderWidth: 2,
        justifyContent: "center",
    },
    calendar_container: {
        padding: 16,
        borderRadius: 20,
        borderColor: Colors.color_light_gray,
        borderWidth: 2,
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
    button_container: {
        flexDirection: "row",
        marginVertical: 16,
        bottom: 0,
    },
    title: {
        fontSize: 24,
    },
    subTitle: {
        fontSize: 20,
        padding: 16,
    },
    desc: {
        fontSize: 14,
        fontWeight: "300",
        padding: 8,
    },
    timeSlots: {
        marginHorizontal: 24,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#1976d2",
        borderRadius: 20,
        padding: 8,
        alignSelf: "auto",
    },
    selectedTime: {
        alignSelf: "flex-start",
        backgroundColor: "#1976d2",
        color: "#fff",
        padding: 8,
    },
});
