import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { ErrorMessage, Form, FormField, SubmitButton } from "../components/forms";
import authApi from '../api/auth';
import userAuth from "../auth/userAuth";


const validationSchema = Yup.object().shape({
  roll_no:Yup.number().required().min(10).label("Roll Number"),
  password: Yup.string().required().min(8).label("Password"),
});

function LoginScreen() {

  const { logIn } = userAuth();

  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async (data) => {
    const result = await authApi.login(data);
    if (!result.ok) return setLoginFailed(true)
    setLoginFailed(false);
    
    logIn(result.data.token)
  }

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/adaptive-icon.png")} />

      <Form
        initialValues={{ roll_no: "", password: "",  username: ""}}
        onSubmit={(Value)=>handleSubmit(JSON.stringify(Value))}
        validationSchema={validationSchema}
      >
        <ErrorMessage error="Invalid roll number and/or password" visible={loginFailed} />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="number-pad"
          name="roll_no"
          placeholder="Roll Number"
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="default"
          name="username"
          placeholder="Username"
          textContentType="username"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
