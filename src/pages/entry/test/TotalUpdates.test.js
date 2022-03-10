import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { Options } from '../Options';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  // Make sure total starts out $0.00
  const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate'
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />);

  // Make sure total starts out $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // check Gummi Bears topping and check subtotal
  const hotFudgeCheckBox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
  userEvent.click(hotFudgeCheckBox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // check Cherries topping and check subtotal
  const cherries = await screen.findByRole('checkbox', { name: 'Cherries' });
  userEvent.click(cherries);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  // Uncheck Gummy Bears topping and check subtotal
  userEvent.click(hotFudgeCheckBox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});