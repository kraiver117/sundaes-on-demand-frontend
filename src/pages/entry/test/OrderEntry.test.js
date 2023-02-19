import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { OrderEntry } from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("handles errors for scoops and topping routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("Disable order Button for No Scoops", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // find order sundae button
  const orderSundaeButton = screen.getByText(/order sundae!/i);
  expect(orderSundaeButton).toBeDisabled();

  // find vanilla input
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });

  // check that button is enabled when a vanilla scoop was added
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(orderSundaeButton).toBeEnabled();

  // clear vanilla topping to re-check that order sundae button is disabled
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  expect(orderSundaeButton).toBeDisabled();
});
