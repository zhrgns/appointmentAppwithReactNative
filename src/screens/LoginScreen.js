import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/button/Button";
import InputBar from "../components/InputBar";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import { Formik } from "formik";
import ErrorHandler, { showTopMessage } from "../utils/ErrorHandler";

const initialFormValues = {
    usermail: "",
    password: "",
};

const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    

    function handleFormSubmit(formValues) {
        const auth = getAuth(app);

        setLoading(true); // İşlem başladığında yüklemeyi etkinleştir

        signInWithEmailAndPassword(
            auth,
            formValues.usermail,
            formValues.password
        )
            .then((res) => {
                showTopMessage("Giriş Başarılı !", "success");
                setLoading(false); // İşlem tamamlandığında yüklemeyi devre dışı bırak
                goToUserProfile();
            })
            .catch((err) => {
                setLoading(false);
                showTopMessage(ErrorHandler(err.code), "danger");
            });
    }

    // Navigation

    function goToMemberSignUp() {
        navigation.navigate("SignUpScreen");
    }

    // Navigation

    function goToUserProfile() {
        navigation.navigate("UserProfileScreen");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}> Giriş Yapın </Text>
            <Formik
                initialValues={{ initialFormValues }}
                onSubmit={handleFormSubmit}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <>
                        <View style={styles.input_container}>
                            <InputBar
                                onType={handleChange("usermail")}
                                value={values.usermail}
                                placeholder={"E-posta adresi"}
                            />
                            <InputBar
                                onType={handleChange("password")}
                                value={values.password}
                                placeholder={"Parola"}
                                isSecure
                            />
                        </View>
                        <View style={styles.button_container}>
                            <Button
                                text="Kaydol"
                                onPress={goToMemberSignUp}
                                theme="secondary"
                            />
                            <Button
                                text="Giriş Yap"
                                onPress={handleSubmit}
                                loading={loading}
                            />
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 48,
    },
    text: {
        marginHorizontal: 24,
        marginVertical: 32,
        fontSize: 30,
        fontFamily: "Mulish-Medium",
    },
    input_container: {
        marginHorizontal: 24,
    },
    button_container: {
        flexDirection: "row",
        margin: 16,
    },
});

export default LoginScreen;
