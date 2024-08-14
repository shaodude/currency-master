import * as React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import AttributionLink from "../Attribution";

test("attribution is correctly rendered", async () => {
  render(<AttributionLink />);

  await waitFor(() =>
    expect(screen.getByText("Rates By Exchange Rate API")).toBeTruthy()
  );
});
