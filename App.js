import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import FlashMessage from "react-native-flash-message";
import Fonts from "./src/utils/Fonts";
import Navigation from "./src/components/Navigation";

export default function App() {
    const [fontsLoaded] = useFonts(Fonts);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <NavigationContainer>
            <Navigation />
            <FlashMessage position="top"/>
        </NavigationContainer>
    );
}
