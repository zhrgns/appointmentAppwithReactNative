import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "./Colors";

 //ICONS
 const iconPref = ({ route }) => {
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
        tabBarActiveTintColor: Colors.color_blue,
        tabBarInactiveTintColor: "gray",
    };
}

export default iconPref;