// RegisterPage.test.js

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";
import RegisterPage from "../Register/RegisterPage";

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

describe("RegisterPage Component", () => {
  test("renders RegisterPage component", () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
    const registerPageText = screen.getByText(/Let Us Know You/i);
    expect(registerPageText).toBeInTheDocument();
  });

  test("form submission with valid data", async () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
    const mockData = {
      userRole: "Farmer",
      fname: "Upul",
      lname: "Senarathne",
      email: "upulsenarathne@gmail.com",
      password: "12345678",
      district: "Matara",
    };

    const submitButton = await screen.findByRole("button", {
      name: /Sign Up/i,
    });

    fireEvent.change(screen.getByTestId("user-role"), {
      target: { value: mockData.userRole },
    });

    fireEvent.change(screen.getByPlaceholderText(/First name/i), {
      target: { value: mockData.fname },
    });

    fireEvent.change(screen.getByPlaceholderText(/Last name/i), {
      target: { value: mockData.lname },
    });

    fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {
      target: { value: mockData.email },
    });

    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
      target: { value: mockData.password },
    });

    fireEvent.change(screen.getByTestId("district-select"), {
      target: { value: mockData.district },
    });

    fireEvent.click(submitButton);
    await (async () => {});

    expect(toast).toHaveBeenCalledWith("Registration Successful");
  });

  test("form submission with invalid data", async () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
    const submitButton = await screen.findByRole("button", {
      name: /Sign Up/i,
    });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Role is required/i)).toBeInTheDocument();
    expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    // Add more assertions for other required fields or validation errors as needed
  });
});
