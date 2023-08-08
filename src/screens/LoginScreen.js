import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button/Button";
import InputBar from "../components/InputBar";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";
import ErrorHandler from "../utils/ErrorHandler";

const initialFormValues = {
    usermail: "",
    password: "",
};

const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    function handleFormSubmit(formValues) {
        const auth = getAuth(app);

        signInWithEmailAndPassword(
            auth,
            formValues.usermail,
            formValues.password
        )
            .then((res) =>
                showMessage({ message: "Giriş Başarılı !", type: "success" })
            )
            .catch((err) => showMessage({ message: ErrorHandler(err.code), type: "danger" }));
    }
    
    // Use it later
    // function handleSignOut() {
    //     const auth = getAuth(app);
    //     signOut(auth)
    //         .then((res) => console.log("Çıkış yaptı"))
    //         .catch((err) => console.log(err));
    // }

    // Navigation

    function goToMemberSignUp() {
        navigation.navigate("SignUpScreen");
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
            {/* <View style={styles.button_container}>
                <Button text="çıkış Yap" onPress={handleSignOut} />
            </View> */}
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
