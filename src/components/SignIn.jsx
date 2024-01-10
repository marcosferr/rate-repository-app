import React from "react";
import { View, Button } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import FormikTextInput from "./FormikTextInput";
import AuthStorage from "../utils/authStorage";
const SignIn = () => {
  const [signIn, result] = useSignIn();
  const authStorage = new AuthStorage();
  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const onSubmit = (values) => {
    const { username, password } = values;
    try {
      signIn({ username, password });
      authStorage.setAccessToken(result.data.authenticate.accessToken);
    } catch (e) {
      console.log("Failed to authenticate: ", e);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <Button title="Sign in" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
