import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BookingHistoryScreen() {
    const bookingHistoryData = [
        { id: 1, serviceName: "Hizmet 1", date: "2023-08-01" },
        { id: 2, serviceName: "Hizmet 2", date: "2023-08-05" },
        { id: 3, serviceName: "Hizmet 3", date: "2023-08-10" },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header_text}></Text>
            <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Geçmiş Randevularınız:</Text>
                {bookingHistoryData.map((booking) => (
                    <View key={booking.id} style={styles.bookingItem}>
                        <Text>{booking.serviceName}</Text>
                        <Text>{booking.date}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 48,
    },
    header_text: {
        marginHorizontal: 24,
        marginVertical: 32,
        fontSize: 30,
        fontFamily: "Mulish-Medium",
    },
    historyContainer: {
        marginHorizontal: 24,
    },
    historyTitle: {
        fontSize: 20,
        fontFamily: "Mulish-Bold",
        marginBottom: 16,
    },
    bookingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
});
