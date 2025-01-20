import React from "react";
import Amount from "./Amount";

const CurrentLoan = ({ loanActivityArr }) => {
  const activeTransactions = loanActivityArr.filter(
    (transaction) => transaction.status === "active"
  );
  const currentLoanSum = activeTransactions.reduce(
    (sum, transaction) => sum + +transaction.amount,
    0
  );
  const totalInterest = activeTransactions.reduce(
    (sum, transaction) => sum + +transaction.pendingInterest,
    0
  );
  return (
    <div className="current-loan">
      <div>
        <span className="current-loan-title">Current Loan Sum</span>
        <Amount amount={currentLoanSum} />
      </div>
      <span>
        Interest
        <Amount amount={totalInterest} />
      </span>
    </div>
  );
};

export default CurrentLoan;
