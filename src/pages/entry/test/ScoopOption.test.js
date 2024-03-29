import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScoopOption } from "../ScoopOption";

test.only("Indicate if scoop count is non-init out of range", async () => {
  render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />);

  // expect input to be invalid with negative number
  const vanillaInput = screen.getByRole("spinbutton");
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  // replace with decimal input
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  // replace with input that's too high
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");
});
