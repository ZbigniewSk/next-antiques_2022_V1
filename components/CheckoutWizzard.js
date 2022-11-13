import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

export default function CheckoutWizzard({ activeStep = 0 }) {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "transparent",
      }}
    >
      {["Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step) => (
          <Step
            key={step}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "success.dark", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                {
                  color: "success.main", // Just text label (COMPLETED)
                },
              "& .MuiStepLabel-root .Mui-active": {
                color: "success.dark", // circle color (ACTIVE)
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                {
                  color: "success.main", // Just text label (ACTIVE)
                },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "success.main", // circle's number (ACTIVE)
              },
            }}
          >
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}
