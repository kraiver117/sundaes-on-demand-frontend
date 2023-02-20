import { FC, useState } from "react";
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { OrderConfirmation } from "./pages/confirmation/OrderConfirmation";
import { OrderEntry } from "./pages/entry/OrderEntry";
import { OrderSummary } from "./pages/summary/OrderSummary";
import { Phase, SetOrderPhase } from "./interfaces/phase";

function App() {
  // states of orderPhase 'inProgress', 'review' or 'completed'
  const [orderPhase, setOrderPhase] = useState<Phase>("inProgress");

  let Component: FC<SetOrderPhase> = OrderEntry; // default
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
      break;
  }

  return (
    <OrderDetailsProvider>
      <Container>
        <Component setOrderPhase={setOrderPhase} />
      </Container>
    </OrderDetailsProvider>
  );
}

export default App;
