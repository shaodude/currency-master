import * as React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import AttributionLink from "../Attribution";
import { Linking } from "react-native";

// Mock the Linking API
jest.mock("react-native/Libraries/Linking/Linking", () => ({
  openURL: jest.fn(),
}));

test("attribution text is correctly rendered", async () => {
  render(<AttributionLink />);

  await waitFor(() =>
    expect(screen.getByText("Rates By Exchange Rate API")).toBeTruthy()
  );
});

test("clicking the attribution link opens the correct URL", async () => {
  render(<AttributionLink />);

  const linkElement = screen.getByText("Rates By Exchange Rate API");

  fireEvent.press(linkElement);

  await waitFor(() =>
    expect(Linking.openURL).toHaveBeenCalledWith(
      "https://www.exchangerate-api.com"
    )
  );
});
