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

import app from "../../firebaseConfig";
import iconPref from "../utils/IconUtils";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { Use } from "react-native-svg";

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

export default Navigation = ({ navigation }) => {
    const [user, setUser] = useState(getAuth(app).currentUser);

    const auth = getAuth();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(!!user);
        });
    }, []);

    return (
        <Tab.Navigator screenOptions={iconPref}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Search"
                component={SearchStack}
                options={{ headerShown: false }}
            />

            {user ? (
                <Tab.Screen
                    name="Calendar"
                    component={CalendarScreen}
                    options={{ headerShown: false }}
                />
            ) : (
                <Tab.Screen
                    name="Calendar"
                    component={AuthStack}
                    options={{ headerShown: false }}
                />
            )}

            {user ? (
                <Tab.Screen
                    name="Profile"
                    component={UserProfileScreen}
                    options={{ headerShown: false }}
                />
            ) : (
                <Tab.Screen
                    name="Profile"
                    component={AuthStack}
                    options={{ headerShown: false }}
                />
            )}
        </Tab.Navigator>
    );
};
