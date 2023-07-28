import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Modal,
    TouchableOpacity,
} from "react-native";
import Button from "../components/Button";
import React, { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";

export default function ServiceBookingScreen({ route }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    LocaleConfig.locales["tr"] = {
        monthNames: [
            "Ocak",
            "Şubat",
            "Mart",
            "Nisan",
            "Mayıs",
            "Haziran",
            "Temmuz",
            "Ağustos",
            "Eylül",
            "Ekim",
            "Kasım",
            "Aralık",
        ],
        monthNamesShort: [
            "Oca",
            "Şub",
            "Mar",
            "Nis",
            "May",
            "Haz",
            "Tem",
            "Ağu",
            "Eyl",
            "Eki",
            "Kas",
            "Ara",
        ],
        dayNames: [
            "Pazartesi",
            "Salı",
            "Çarşamba",
            "Perşembe",
            "Cuma",
            "Cumartesi",
            "Pazar",
        ],
        dayNamesShort: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
        today: "Bugün",
    };
    LocaleConfig.defaultLocale = "tr";

    const onDateSelect = (day) => {
        setSelectedDate(day.dateString);
        console.log(day);
    };

    const onTimeSelect = (time) => {
        setSelectedTime(time);
        console.log(time);
    };

    const today = moment().format("YYYY-MM-DD");
    const threeMonthsLater = moment().add(3, "months").format("YYYY-MM-DD");

    const { item } = route.params;

    return (
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
                        selectedColor: "#1976d2",
                        selectedTextColor: "white",
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
                                styles.timeSlots,
                                selectedTime === "09:00 - 10:00" &&
                                    styles.selectedTime,
                            ]}
                            onPress={() => onTimeSelect("09:00 - 10:00")}
                        >
                            <Text>09:00 - 10:00</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.timeSlots,
                                selectedTime === "10:00 - 11:00" &&
                                    styles.selectedTime,
                            ]}
                            onPress={() => onTimeSelect("10:00 - 11:00")}
                        >
                            <Text>10:00 - 11:00</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={styles.button_container}>
                <Button text={"Tamamla"} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 48,
        marginHorizontal: 24,
    },
    header_container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 24,
        padding: 16,
        borderRadius: 20,
        borderColor: "#e6e6e6",
        borderWidth: 2,
        justifyContent: "center",
    },
    date_container: {
        backgroundColor: "#fff",
        flexDirection: "row",
        padding: 16,
        borderRadius: 20,
        borderColor: "#e6e6e6",
        borderWidth: 2,
        justifyContent: "center",
    },
    calendar_container: {
        padding: 16,
        borderRadius: 20,
        borderColor: "#e6e6e6",
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
