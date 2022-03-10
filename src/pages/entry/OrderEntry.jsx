import React from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { Options } from './Options';

export const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </div>
  );
};
