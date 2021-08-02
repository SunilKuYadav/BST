import React, { useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import * as Yup from "yup";


import Screen from "../components/Screen";
import usersApi from "../api/users";
import authApi from "../api/auth";
import userAuth from "../auth/userAuth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  roll_no:Yup.number().required().min(10).label("Roll Number"),
  route_no: Yup.number().required().min(2).label("Bus Number"),
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  // confPassword: Yup.string().required().min(8).label("Password"),
});

function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = userAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    console.log(userInfo);
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.message);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    } else{
      Alert.alert(
        "Account",
        "Your account register successfully",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }

    // "Error: ER_DUP_ENTRY: Duplicate entry '1234567899' for key 'roll_no'"
    // "Error: ER_DUP_ENTRY: Duplicate entry 'ramram' for key 'username'"

    // console.log(result);
    // const authTokens = await loginApi.request(
    //   userInfo.roll_no,
    //   userInfo.password
    // );
    // console.log(authTokens);
    // auth.logIn(authTokens.data.token);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <ScrollView>
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", roll_no: "", route_no:"", username: "", email: "", password: ""}}
        onSubmit={(value)=>handleSubmit(JSON.stringify(value))}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          name="name"
          placeholder="Full Name"
          textContentType="name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          name="roll_no"
          placeholder="Roll Number"
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          name="route_no"
          placeholder="Bus Route / Bus Number"
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          name="username"
          placeholder="Username"
          textContentType="username"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          // icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          // icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        {/* <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          name="confPassword"
          placeholder="Conform Password"
          textContentType="password"
        /> */}
        
        <SubmitButton title="Register" />
      </Form>
    </Screen>
    </ScrollView> 
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;