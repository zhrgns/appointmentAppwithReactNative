import React, { useRef } from "react";
import { TouchableOpacity, Text, StyleSheet,Animated} from "react-native";
import { colors } from "../styles/Theme";

const TimeSlot = ({ time, onPress, isSelected, isBooked }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        if (!isBooked) {
            onPress(time.apptime);
        }
    };

    const handlePressIn = () => {
        if (!isBooked) {
            Animated.spring(scaleValue, {
                toValue: 1.2,
                useNativeDriver: true,
            }).start();
        }
    };

    const handlePressOut = () => {
        if (!isBooked) {
            Animated.spring(scaleValue, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    };


    return (
        <TouchableOpacity
            style={[
                styles.container,
                isSelected && styles.selectedButton,
                isBooked && styles.bookedButton,
                { transform: [{ scale: scaleValue }] },
            ]}
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isBooked}
        >
            <Animated.Text
                style={[
                    styles.timeText,
                    isSelected && styles.selectedText,
                    isBooked && styles.bookedText,
                ]}
                
            >
                {time.apptime}
            </Animated.Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        margin: 8,
        borderRadius: 50,
        borderColor: colors.color_primary,
        borderWidth: 1,
    },
    timeText: {
        color: colors.color_primary,
        fontSize: 14,
        fontFamily: "Mulish-Light",
    },
    bookedButton: {
        borderColor: colors.color_light_gray,
        backgroundColor: colors.color_light_gray,
    },
    bookedText: {
        color: colors.color_gray, 
    },
    selectedText: {
        color: colors.color_white,
    },
    selectedButton: {
        backgroundColor: colors.color_primary,
    },
});

export default TimeSlot;
