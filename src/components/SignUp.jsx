import React from "react";
import { View, Button } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikTextInput from "./FormikTextInput";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";
const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters")
      .max(30, "Username must be at most 30 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters")
      .max(50, "Password must be at most 50 characters"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({
        variables: { user: { username, password } },
      });
      signIn({ username, password });
    } catch (e) {
      console.log("Failed to create user: ", e);
    }
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <FormikTextInput
            name="passwordConfirmation"
            placeholder="Confirm Password"
            secureTextEntry
          />
          <Button title="Sign Up" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
