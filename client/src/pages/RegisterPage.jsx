import React, { useState, useContext } from "react";
import {
    Text,
    View,
    TextInput,
    Image,
    Pressable,
    Alert,
    Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import * as Haptics from "expo-haptics";

import RegisterGraphic from "../components/graphic/RegisterGraphic";
import { AUTH, MANAGER_MAIN_PAGE, CLEANER_MAIN_PAGE } from "../utils/consts";
import { pagesStyles } from "../styles/pagesStyles";
import { Context } from "../../App";
import { registration } from "../http/userAPI";

const RegisterPage = ({ navigation }) => {
    const { user } = useContext(Context);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [repeatPassword, setRepeatPassword] = useState(null);

    const register = () => {
        if (!email || !password || !repeatPassword) {
            return Alert.alert("Внимание", "Не все поля заполнены.", [
                { text: "OK" },
            ]);
        }
        if (password != repeatPassword) {
            return Alert.alert("Внимание", "Пароли не совпадают", [
                { text: "OK" },
            ]);
        }
        registration(email, password, user.role)
            .then((response) => {
                AsyncStorage.setItem("@token", response.data.token).then(() => {
                    user.setUser(jwt_decode(response.data.token));
                    user.role == "MANAGER"
                        ? navigation.navigate(MANAGER_MAIN_PAGE)
                        : navigation.navigate(CLEANER_MAIN_PAGE);
                });
            })
            .catch((error) => {
                if (Platform.OS === "ios") {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                } else {
                    Vibration.vibrate(50);
                }
                Alert.alert("Внимание", error.response.data.message, [
                    { text: "OK" },
                ]);
            });
    };

    return (
        <View style={pagesStyles.container}>
            <View style={[pagesStyles.contentContainer, { marginTop: "70%" }]}>
                <View style={{ marginBottom: "5%" }}>
                    <RegisterGraphic />
                </View>
                <View style={{ marginBottom: "5%" }}>
                    <Text style={pagesStyles.decoration}>
                        Введите ваш Email и придумайте пароль
                    </Text>
                </View>
                <View style={{ marginBottom: "5%" }}>
                    <TextInput
                        textContentType={"emailAddress"}
                        placeholderTextColor="#707070"
                        style={pagesStyles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    ></TextInput>
                </View>
                <View style={{ marginBottom: "5%" }}>
                    <TextInput
                        textContentType={"password"}
                        secureTextEntry={true}
                        placeholderTextColor="#707070"
                        style={pagesStyles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                    ></TextInput>
                </View>
                <View style={{ marginBottom: "5%" }}>
                    <TextInput
                        textContentType={"password"}
                        secureTextEntry={true}
                        placeholderTextColor="#707070"
                        style={pagesStyles.input}
                        placeholder="Confirm the password"
                        value={repeatPassword}
                        onChangeText={(repeatPassword) =>
                            setRepeatPassword(repeatPassword)
                        }
                    ></TextInput>
                </View>
                <View style={{ marginBottom: "5%" }}>
                    <Pressable
                        style={pagesStyles.button}
                        onPress={() => register()}
                    >
                        <Text style={pagesStyles.buttonText}>
                            Зарегестрироваться
                        </Text>
                    </Pressable>
                </View>
                <View style={{ marginBottom: "5%" }}>
                    <Text style={pagesStyles.questions}>Есть аккаунт?</Text>
                </View>
                <View style={{ marginBottom: "5%" }}>
                    <Text
                        style={pagesStyles.choose}
                        onPress={() => navigation.navigate(AUTH)}
                    >
                        Войти
                    </Text>
                </View>
                <Text
                    style={pagesStyles.navigation}
                    onPress={() => navigation.goBack()}
                >
                    Назад <Image source={require("../../assets/Back.png")} />
                </Text>
            </View>
        </View>
    );
};

export default RegisterPage;
