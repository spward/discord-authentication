import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import "./CardSection.scss";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CardSection = () => {
  return (
    <label>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  );
};

export default CardSection;
