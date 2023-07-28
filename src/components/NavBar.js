import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SearchScreen from "../screens/SearchScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import ServiceBookingScreen from "../screens/ServiceBookingScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown:false}} />
            <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen} options={{headerShown:false}}/>
            <Stack.Screen name="ServiceBookingScreen" component={ServiceBookingScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default NavBar = () => {

    //ICONS
    function iconPref({ route }) {
        return {
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                    iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Profile") {
                    iconName = focused ? "person" : "person-outline";
                } else if (route.name === "Calendar") {
                    iconName = focused ? "calendar" : "calendar-outline";
                } else if (route.name === "Search") {
                    iconName = focused ? "search" : "search-outline";
                }
                //returns in each icon
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#1976d2",
            tabBarInactiveTintColor: "gray",
        };
    }

    
    return (
        <Tab.Navigator screenOptions={iconPref} >
            <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
            <Tab.Screen name="Search" component={SearchStack} options={{headerShown:false}} />
            <Tab.Screen name="Calendar" component={CalendarScreen} options={{headerShown:false}} />
            <Tab.Screen name="Profile" component={ProfileStack}  options={{headerShown:false}}/>
        </Tab.Navigator>
    );
};
