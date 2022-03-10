import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { Options } from '../Options';
import { OrderEntry } from '../OrderEntry';

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

  // check Hot fudge topping and check subtotal
  const hotFudgeCheckBox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
  userEvent.click(hotFudgeCheckBox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // check Cherries topping and check subtotal
  const cherries = await screen.findByRole('checkbox', { name: 'Cherries' });
  userEvent.click(cherries);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  // Uncheck Hot fudge topping and check subtotal
  userEvent.click(hotFudgeCheckBox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    });

    // Check that the grand total starts out at 0
    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    });

    // add two vanilla scoops and check total
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    // add cherries and check total
    const cherriesCheckBox = await screen.findByRole('checkbox', {
      name: 'Cherries'
    });
    userEvent.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    });

    const cherriesCheckBox = await screen.findByRole('checkbox', {
      name: 'Cherries'
    });

    userEvent.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if an item is removed', async () => {
    render(<OrderEntry />);

    // add cherries
    const cherriesCheckBox = await screen.findByRole('checkbox', {
      name: 'Cherries'
    });
    userEvent.click(cherriesCheckBox);
    // grand total $1.50

    // Update vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    // remove 1 scoop of vanilla and check grand total
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    // Check grand total
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    });
    expect(grandTotal).toHaveTextContent('3.50');

    // remove cherries and check grand total
    userEvent.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});