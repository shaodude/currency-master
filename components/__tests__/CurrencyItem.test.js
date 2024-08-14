import * as React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import CurrencyItem from "../CurrencyItem";

const mockCurrencyPair = {"code": "USD", "rate": "13.5"}

test("attribution is correctly rendered", async () => {
  render(<CurrencyItem pair={mockCurrencyPair} />);

  await waitFor(() =>
    expect(screen.getByText("USD")).toBeTruthy()
  );
  await waitFor(() =>
    expect(screen.getByText("13.5")).toBeTruthy()
  );
});
