import React, { FormEvent, FC, useState } from "react";
import { Form, Button, Popover, OverlayTrigger } from "react-bootstrap";
import { SetOrderPhase } from "../../interfaces/phase";

export const SummaryForm: FC<SetOrderPhase> = ({
  setOrderPhase,
}: SetOrderPhase) => {
  const [checked, setChecked] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // pass along to the next phase
    setOrderPhase("completed");
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!checked}>
        Confirm Order
      </Button>
    </Form>
  );
};
