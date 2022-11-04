import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { classes } from "../utils/styles";

export default function CheckoutWizzard({ activeStep = 0 }) {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={classes.checkoutWizzard}
    >
      {["Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}
