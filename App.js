import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import FlashMessage from "react-native-flash-message";
import Fonts from "./src/styles/Fonts";
import Navigation from "./src/components/Navigation";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {

    //font
    const [fontsLoaded] = useFonts(Fonts);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <MenuProvider>
            <NavigationContainer>
                <Navigation />
                <FlashMessage position="top" />
            </NavigationContainer>
        </MenuProvider>
    );
}
