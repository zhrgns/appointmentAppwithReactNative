import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SearchScreen from "../screens/SearchScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import ServiceBookingScreen from "../screens/ServiceBookingScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import BookingHistoryScreen from "../screens/BookingHistoryScreen";
import UserInfosScreen from "../screens/UserInfosScreen";

import app from "../../firebaseConfig";
import iconPref from "../utils/IconUtils";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import NotificationsScreen from "../screens/NotificationsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UserProfileScreen"
                component={UserProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ServiceBookingScreen"
                component={ServiceBookingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BookingHistoryScreen"
                component={BookingHistoryScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="UserInfosScreen"
                component={UserInfosScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ServiceDetailScreen"
                component={ServiceDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ServiceBookingScreen"
                component={ServiceBookingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CalendarScreen"
                component={CalendarScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default Navigation = () => {
    const [user, setUser] = useState(getAuth(app).currentUser);
    const auth = getAuth();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(!!user);
        });
    }, []);

    function getTabScreen(authenticatedComponent, defaultComponent) {
        return user ? authenticatedComponent : defaultComponent;
    }

    return (
        <>
            <Tab.Navigator screenOptions={iconPref} initialRouteName="Anasayfa">
                <Tab.Screen name="Anasayfa" component={HomeStack} />
                <Tab.Screen name="Ara" component={SearchStack} />
                <Tab.Screen
                    name="Randevularım"
                    component={getTabScreen(CalendarScreen, AuthStack)}
                />
                <Tab.Screen
                    name="Profil"
                    component={getTabScreen(UserProfileScreen, AuthStack)}
                />
            </Tab.Navigator>
        </>
    );
};
