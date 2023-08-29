import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function BookingHistoryScreen() {
    const bookingHistoryData = [
        { id: 1, serviceName: "Eğitim", date: "2023-08-01" },
        { id: 2, serviceName: "Sağlık", date: "2023-08-05" },
        { id: 3, serviceName: "Spor", date: "2023-08-10" },
    ];

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header_text}>Bildirimlerim</Text>
                <View style={styles.historyContainer}>
                    {bookingHistoryData.map((booking) => (
                        <View key={booking.id} style={styles.bookingItem}>
                            <Text>{booking.serviceName}</Text>
                            <Text>{booking.date}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 48,
    },
    header_text: {
        marginVertical: 16,
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
