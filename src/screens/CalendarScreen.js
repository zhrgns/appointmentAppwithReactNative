import React from "react";

import { View, Text } from "react-native";
import { useFonts } from 'expo-font';

export default function CalendarScreen() {


    return (
        <View 
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{ fontSize: 30 }}>
                Randevunuz Bulunmuyor!
            </Text>
        </View>
    );
}
