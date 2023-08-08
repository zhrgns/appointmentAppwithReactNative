import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button/Button";
import InputBar from "../components/InputBar";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";
import ErrorHandler from "../utils/ErrorHandler";
import { ScrollView } from "react-native-gesture-handler";

const initialFormValues = {
    usermail: "",
    password: "",
    passwordre: "",
};

export default function SignUpScreen() {
    const [loading, setLoading] = useState(false);

    function handleFormSubmit(formValues) {
        const auth = getAuth(app);

        setLoading(true);

        if (formValues.password != formValues.passwordre) {
            showMessage({
                message: "Parola tekrarı uyuşmuyor, tekrar deneyin!",
                type: "warning",
            });
            setLoading(false);
        } else {
            createUserWithEmailAndPassword(
                auth,
                formValues.usermail,
                formValues.password
            )
                .then(
                    (res) => {
                        showMessage({
                            message: " Kayıt Başarılı !",
                            type: "success",
                        });
                        setLoading(false);
                    }
                    //buradan home screene gitmeli veya go back
                )
                .catch((err) =>
                    showMessage({
                        message: ErrorHandler(err.code),
                        type: "danger",
                    })
                );

            setLoading(false);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}> Kayıt Olun </Text>
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
                                onType={handleChange("phoneNumber")}
                                value={values.phoneNumber}
                                placeholder={"Telefon Numarası"}
                            />
                            <InputBar
                                onType={handleChange("password")}
                                value={values.password}
                                placeholder={"Parola"}
                                isSecure
                            />
                            <InputBar
                                onType={handleChange("passwordre")}
                                value={values.passwordre}
                                placeholder={"Parola Tekrar"}
                                isSecure
                            />
                        </View>
                        <View style={styles.button_container}>
                            <Button
                                text="Kaydı Tamamla"
                                onPress={handleSubmit}
                                loading={loading}
                            />
                        </View>
                    </>
                )}
            </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        marginTop: 48,
    },
    text: {
        marginHorizontal: 24,
        marginVertical: 32,
        fontSize: 30,
    },
    input_container: {
        marginHorizontal: 24,
    },
    button_container: {
        flexDirection: "row",
        margin: 16,
    },
});
