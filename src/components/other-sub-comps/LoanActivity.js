import React from "react";
import Amount from "./Amount";

const LoanActivity = ({ loanActivityArr }) => {
  return (
    <section className="loan-activity-section">
      <h1>Activity</h1>
      {loanActivityArr &&
        loanActivityArr.map((loanActivity) => (
          <div className="loan-activity" key={loanActivity.transactionId}>
            <div className="activity-head">
              <div>{loanActivity.loanType}</div>
              <Amount amount={loanActivity.amount} />
            </div>
            <div className="activity-details">
              <div className={`${loanActivity.status}`}>
                {loanActivity.status}
              </div>
              <div>
                {loanActivity.transactionDate
                  ? loanActivity.transactionDate.split("T")[0]
                  : ""}
              </div>
              <div>Pending Interest: {loanActivity.pendingInterest}/-</div>
            </div>
          </div>
        ))}
    </section>
  );
};

export default LoanActivity;
