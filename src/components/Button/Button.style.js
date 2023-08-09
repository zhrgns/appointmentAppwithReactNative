import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";

const style_base = StyleSheet.create({
    container: {
        borderRadius: 20,
        marginHorizontal: 8,
        padding: 8,
        flex: 1,
        justifyContent:"center"
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
            backgroundColor:Colors.color_blue,
        }, text : {
            ...style_base.text,
            color: Colors.color_white,

        }
    }),

    secondary: StyleSheet.create({
        ...style_base,
        container: {
            ...style_base.container, 
            backgroundColor: Colors.color_white,
            borderColor: Colors.color_blue,
            borderWidth:2,
        }, text : {
            ...style_base.text,
            color:Colors.color_blue,
        }
    })
};
