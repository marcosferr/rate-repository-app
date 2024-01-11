import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignIn } from "../src/components/SignIn";

describe("SignIn", () => {
  it("calls onSubmit with correct parameters when Sign in button is pressed", async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<SignIn onSubmit={onSubmit} />);

    fireEvent.changeText(getByTestId("usernameInput"), "testuser");
    fireEvent.changeText(getByTestId("passwordInput"), "testpassword");
    fireEvent.press(getByTestId("submitButton"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        username: "testuser",
        password: "testpassword",
      });
    });
  });
});
