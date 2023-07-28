import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./src/components/NavBar";
import { useFonts } from "expo-font";

export default function App() {
    const [fontsLoaded] = useFonts({
        "Mulish-Light": require("./assets/fonts/Mulish-Light.ttf"),
        "Mulish-Medium": require("./assets/fonts/Mulish-Medium.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <NavigationContainer>
            <NavBar />
        </NavigationContainer>
    );
}
