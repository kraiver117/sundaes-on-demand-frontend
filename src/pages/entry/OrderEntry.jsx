import React from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Options } from "./Options";

export const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  // disable order button if there aren't any scoops in order
  const orderButtonDisabled = orderDetails.totals.scoops === "$0.00";

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button
        disabled={orderButtonDisabled}
        onClick={() => setOrderPhase("review")}
      >
        Order Sundae!
      </Button>
    </div>
  );
};
