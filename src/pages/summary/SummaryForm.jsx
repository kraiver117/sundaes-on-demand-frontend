import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export const SummaryForm = () => {
  const [checked, setChecked] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: 'blue' }}>Terms and Conditions</span>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={!checked}>
        Confirm Order
      </Button>
    </Form>
  );
};
