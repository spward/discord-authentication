import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "../Payment/Payment";
import Subscription from "../Subscription/Subscription";
import "./Dashboard.scss";

const stripePromise = loadStripe("pk_test_qXQRiA7KUmNC3RmZIVr81R9C00p88oCKkd");

const Dashboard = ({ userInfo, history, code, userId }) => {
  useEffect(() => {
    if (!userId && !code) {
      history.push("/");
    }
  });

  return (
    <React.Fragment>
      {!userInfo || (userInfo && !userInfo.email) ? <p>Loading...</p> : null}
      {userInfo && userInfo.email ? (
        <div className="dashboard">
          <Elements stripe={stripePromise}>
            <Payment userInfo={userInfo} />
            <Subscription />
          </Elements>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default withRouter(Dashboard);
