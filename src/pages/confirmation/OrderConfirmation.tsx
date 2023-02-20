import React, { useEffect, useState, FC } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { AlertBanner } from "../common/AlertBanner";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Phase } from "../../interfaces/phase";
import { SetOrderPhase } from "../../interfaces/phase";
import { OrderDetailsContext } from "../../contexts/OrderDetails";

export const OrderConfirmation: FC<SetOrderPhase> = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  function handleClick() {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase("inProgress");
  }

  if (error) return <AlertBanner message={null} variant={null} />;

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p>as per our terms and conditions, nothing will happen now</p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};
