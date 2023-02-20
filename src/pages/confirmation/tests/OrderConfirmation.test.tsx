import { render, screen, act } from "../../../test-utils/testing-library-utils";
import { OrderConfirmation } from "../OrderConfirmation";
import { server } from "../../../mocks/server";
import { rest } from "msw";

test("show error in order confirmation view", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole("alert");

  expect(alert).toHaveTextContent(
    "An unexpected error occurred. Please try again later."
  );
});
