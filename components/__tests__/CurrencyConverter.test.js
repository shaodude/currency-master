import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import CurrencyConverter from "../CurrencyConverter";

// mock data
const mockValidCurrencyPair = { code: "SGD", rate: "1.302791" };
const mockBase = "USD";

describe("CurrencyConverter Component", () => {
  test("currency item is correctly rendered", async () => {
    render(<CurrencyConverter pair={mockValidCurrencyPair} base={mockBase} />);

    // base currency and target currency texts should be rendered correctly
    expect(screen.getByText("1 USD = 1.302791 SGD")).toBeTruthy();

    expect(screen.getByText("USD")).toBeTruthy();
    // should display default input of 1
    expect(screen.getByDisplayValue("1")).toBeTruthy();

    expect(screen.getByText("SGD")).toBeTruthy();
    // should display rate to 2 d.p.
    expect(screen.getByDisplayValue("1.30")).toBeTruthy();
  });

  test("updates computed value when base value changes", async () => {
    render(<CurrencyConverter pair={mockValidCurrencyPair} base={mockBase} />);

    const baseValueInput = screen.getByDisplayValue("1");
    fireEvent.changeText(baseValueInput, "2");

    const displayRate = (parseFloat(mockValidCurrencyPair.rate) * 2).toFixed(2);
    expect(screen.getByDisplayValue(displayRate)).toBeTruthy();
  });

  test("switches base and target currencies accurately when the switch button is pressed", async () => {
    render(<CurrencyConverter pair={mockValidCurrencyPair} base={mockBase} />);

    // fire switch button
    const switchButton = screen.getByText("↑↓");
    fireEvent.press(switchButton);

    // base currency should be SGD and target currency should be USD
    expect(screen.getByText("1 SGD = 0.76758 USD")).toBeTruthy();
    expect(screen.getByText("SGD")).toBeTruthy();
    expect(screen.getByText("USD")).toBeTruthy();

    // base value input should reset to "1" after switching
    expect(screen.getByDisplayValue("1")).toBeTruthy();

    // computed value should update accordingly
    expect(screen.getByDisplayValue("0.77")).toBeTruthy();
  });

  test("after switch, target currency value is accurately computed", async () => {
    render(<CurrencyConverter pair={mockValidCurrencyPair} base={mockBase} />);

    // fire switch button
    const switchButton = screen.getByText("↑↓");
    fireEvent.press(switchButton);

    // base currency should be SGD and target currency should be USD
    expect(screen.getByText("1 SGD = 0.76758 USD")).toBeTruthy();
    expect(screen.getByText("SGD")).toBeTruthy();
    expect(screen.getByText("USD")).toBeTruthy();

    const baseValueInput = screen.getByDisplayValue("1");
    fireEvent.changeText(baseValueInput, "2");

    // computed value should update accordingly
    expect(screen.getByDisplayValue("1.54")).toBeTruthy();
  });

  test("after multiple switches (4), states are properly configured and target currency value is accurately computed", async () => {
    render(<CurrencyConverter pair={mockValidCurrencyPair} base={mockBase} />);

    // fire switch button
    const switchButton = screen.getByText("↑↓");
    fireEvent.press(switchButton); // SGD -> USD
    fireEvent.press(switchButton); // USD -> SGD
    fireEvent.press(switchButton); // SGD -> USD
    fireEvent.press(switchButton); // USD -> SGD

    // base currency should be USD and target currency should be SGD
    expect(screen.getByText("1 USD = 1.302791 SGD")).toBeTruthy();
    expect(screen.getByText("USD")).toBeTruthy();
    expect(screen.getByText("SGD")).toBeTruthy();

    const baseValueInput = screen.getByDisplayValue("1");
    fireEvent.changeText(baseValueInput, "2");

    // computed value should update accordingly
    expect(screen.getByDisplayValue("2.61")).toBeTruthy();
  });
});
