import * as React from "react";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import CurrencyItem from "../CurrencyItem";

const mockValidCurrencyPair = { code: "USD", rate: "13.5" };
const mockInvalidRate = { code: "USD", rate: "invalid-input" };
const mockInvalidCode = { code: "", rate: "13.5" };
const mockInvalidPair = { key: "1" };

test("currency item is correctly rendered", async () => {
  render(<CurrencyItem pair={mockValidCurrencyPair} />);

  await waitFor(() => expect(screen.getByText("USD")).toBeTruthy());
  await waitFor(() => expect(screen.getByText("13.5")).toBeTruthy());
});

test("currency item displays 'error' with invalid input", async () => {
  render(<CurrencyItem pair={mockInvalidRate} />);

  await waitFor(() => expect(screen.getByText("USD")).toBeTruthy());
  await waitFor(() => expect(screen.getByText("Rate Error")).toBeTruthy());
});

test("currency item displays 'error' with empty code", async () => {
  render(<CurrencyItem pair={mockInvalidCode} />);

  await waitFor(() => expect(screen.getByText("Invalid Code")).toBeTruthy());
  await waitFor(() => expect(screen.getByText("13.5")).toBeTruthy());
});

test("currency item displays 'error' for completely invalid pair", async () => {
  render(<CurrencyItem pair={mockInvalidPair} />);

  await waitFor(() => expect(screen.getByText("Invalid Code")).toBeTruthy());
  await waitFor(() => expect(screen.getByText("Rate Error")).toBeTruthy());
});
