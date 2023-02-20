import React, { FC, RefAttributes } from "react";
import Alert from "react-bootstrap/Alert";
import { Color } from "react-bootstrap/esm/types";

type AlertBannerProps = {
  message?: string | null;
  variant?: Color | null;
} & RefAttributes<HTMLDivElement>;

export const AlertBanner: FC<AlertBannerProps> = ({ message, variant }) => {
  const alertMessage =
    message || "An unexpected error occurred. Please try again later.";

  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};
