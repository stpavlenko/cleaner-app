import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoginPage from "./LoginPage";
import { Alert } from "react-native";
import { login } from "../http/userAPI";

describe("LoginPage", () => {
    it("should update email and password state on input change", () => {
        const navigationMock = { navigate: jest.fn(), goBack: jest.fn() };

        const { getByPlaceholderText } = render(
            <LoginPage navigation={navigationMock} />
        );

        const emailInput = getByPlaceholderText("Email");
        const passwordInput = getByPlaceholderText("Password");

        fireEvent.changeText(emailInput, "test@example.com");
        expect(emailInput.props.value).toBe("test@example.com");

        fireEvent.changeText(passwordInput, "password123");
        expect(passwordInput.props.value).toBe("password123");
    });
});

jest.mock("../http/userAPI", () => ({
    login: jest.fn(),
}));

jest.mock("react-native/Libraries/Alert/Alert", () => ({
    alert: jest.fn(),
}));

describe("LoginPage", () => {
    const mockNavigation = { navigate: jest.fn() };
    const mockSetUser = jest.fn();
    const mockContext = {
        user: { setUser: mockSetUser, role: "MANAGER" },
    };

    it("displays an alert if email or password is missing", () => {
        const { getByText } = render(
            <LoginPage navigation={mockNavigation} />,
            {
                wrapper: ({ children }) => (
                    <Context.Provider value={mockContext}>
                        {children}
                    </Context.Provider>
                ),
            }
        );

        fireEvent.press(getByText("Войти"));

        expect(Alert.alert).toHaveBeenCalledWith(
            "Внимание",
            "Не все поля заполнены.",
            [{ text: "OK" }]
        );
    });

    it("calls the login function with correct inputs", async () => {
        login.mockResolvedValueOnce({
            data: { token: "mockToken" },
        });

        const { getByPlaceholderText, getByText } = render(
            <LoginPage navigation={mockNavigation} />,
            {
                wrapper: ({ children }) => (
                    <Context.Provider value={mockContext}>
                        {children}
                    </Context.Provider>
                ),
            }
        );

        fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
        fireEvent.changeText(getByPlaceholderText("Password"), "password123");

        fireEvent.press(getByText("Войти"));

        expect(login).toHaveBeenCalledWith(
            "test@example.com",
            "password123",
            "MANAGER"
        );
    });

    it("navigates to the correct page after successful login", async () => {
        login.mockResolvedValueOnce({
            data: { token: "mockToken" },
        });

        const { getByPlaceholderText, getByText } = render(
            <LoginPage navigation={mockNavigation} />,
            {
                wrapper: ({ children }) => (
                    <Context.Provider value={mockContext}>
                        {children}
                    </Context.Provider>
                ),
            }
        );

        fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
        fireEvent.changeText(getByPlaceholderText("Password"), "password123");

        fireEvent.press(getByText("Войти"));

        expect(mockNavigation.navigate).toHaveBeenCalledWith(
            "MANAGER_MAIN_PAGE"
        );
    });
});
