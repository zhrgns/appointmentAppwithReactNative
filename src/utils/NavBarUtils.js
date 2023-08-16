import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/Theme";
import { Feather, Ionicons } from "@expo/vector-icons";

//ICONS
const iconPref = ({ route }) => {
    return {
        tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === "Anasayfa") {
                iconName = "home";
            } else if (route.name === "Profil") {
                iconName = "user";
            } else if (route.name === "Randevularım") {
                iconName = "calendar";
            } else if (route.name === "Ara") {
                iconName = "search";
            }
            //returns in each icon
            return <Feather name={iconName} size={30} color={color} />;
        },
        tabBarStyle: {
            ...styles.shadow,
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            borderRadius: 20,
            height: 80,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 0
        },
        tabBarActiveTintColor: colors.color_primary,
        tabBarInactiveTintColor: colors.color_gray,
        headerShown: false,
        tabBarShowLabel: false,
    };
};

export const customTabButton = ({ children, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{ top: -20, justifyContent: "center", alignItems: "center" }}
    >
        <View
            style={{
                width: 56,
                height: 56,
                borderRadius: 32,
                backgroundColor: colors.color_primary,
                ...styles.shadow,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Feather name="map-pin" size={30} color={colors.color_white} />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    shadow: {
        shadowColor: colors.color_gray,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default iconPref;
