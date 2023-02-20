import { render, screen } from "../../../test-utils/testing-library-utils";
import { AlertBanner } from "../AlertBanner";

test("Should render AlertBanner Correctly", () => {
  const { asFragment } = render(
    <AlertBanner message="Hi there" variant="success" />
  );

  expect(asFragment()).toMatchSnapshot();
});
