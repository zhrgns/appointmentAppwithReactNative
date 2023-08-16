import { StyleSheet } from "react-native";
import {colors} from "../../styles/Theme";

const style_base = StyleSheet.create({
    container: {
        borderRadius: 20,
        padding: 8,
        flex: 1,
        justifyContent:"center",
        shadowColor: colors.color_gray,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 6,
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        padding: 10,
        fontFamily:"Mulish-Bold"
    },
    activity_icon :{
        padding: 13,
    }
});

export default {
    primary: StyleSheet.create({
        ...style_base,
        container: {
            ...style_base.container,
            backgroundColor:colors.color_primary,
        }, text : {
            ...style_base.text,
            color: colors.color_white,

        }
    }),

    secondary: StyleSheet.create({
        ...style_base,
        container: {
            ...style_base.container, 
            backgroundColor: colors.color_white,
            borderColor: colors.color_primary,
            borderWidth:2,
        }, text : {
            ...style_base.text,
            color:colors.color_primary,
        }
    })
};
