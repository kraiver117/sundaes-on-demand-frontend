import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("should render Summary Form correctly", () => {
  const { asFragment } = render(<SummaryForm setOrderPhase={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

test("Initial State", () => {
  render(<SummaryForm setOrderPhase={() => {}} />);

  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkBox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", () => {
  render(<SummaryForm setOrderPhase={() => {}} />);
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  userEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});

test("popover respond to hover", async () => {
  render(<SummaryForm setOrderPhase={() => {}} />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
