import React from "react";
import { View, Button } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import FormikTextInput from "./FormikTextInput";

const SignIn = () => {
  const [signIn] = useSignIn();

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const onSubmit = (values) => {
    const { username, password } = values;
    try {
      signIn({ username, password });
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
