import React from "react";
import { View, Button } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);

  const initialValues = {
    ownerUsername: "",
    repositoryName: "",
    rating: "",
    review: "",
  };

  const validationSchema = Yup.object().shape({
    ownerUsername: Yup.string().required(
      "Repository owner username is required"
    ),
    repositoryName: Yup.string().required("Repository name is required"),
    rating: Yup.number()
      .required("Rating is required")
      .min(0, "Rating must be at least 0")
      .max(100, "Rating must be at most 100"),
    review: Yup.string(),
  });

  const handleSubmit = (values) => {
    const { ownerUsername, repositoryName, rating, review } = values;

    console.log(values);
    try {
      createReview({
        variables: {
          review: {
            ownerName: ownerUsername,
            repositoryName,
            rating: parseInt(rating),
            text: review,
          },
        },
      });
    } catch (e) {
      console.log("Failed to create review: ", e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput
            name="ownerUsername"
            placeholder="Repository owner's username"
          />

          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
          />

          <FormikTextInput
            name="rating"
            placeholder="Rating"
            keyboardType="numeric"
          />

          <FormikTextInput name="review" placeholder="Review" multiline />

          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
