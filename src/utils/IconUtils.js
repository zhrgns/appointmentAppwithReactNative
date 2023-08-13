import {colors} from "../styles/Theme";
import { Feather } from "@expo/vector-icons";

//ICONS
const iconPref = ({ route }) => {
    return {
        tabBarIcon: ({ focused, color, size }) => {
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
        tabBarActiveTintColor: colors.color_blue,
        tabBarInactiveTintColor: colors.color_gray,
        headerShown: false,
        tabBarShowLabel: false 
    };
};

export default iconPref;
