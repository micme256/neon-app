import React from "react";
import Amount from "../other-sub-comps/Amount";

const RecentTransactions = ({ recentTransaction }) => {
  return (
    <>
      <br />
      <h2>Recent Transactions</h2>
      <br />
      <section className="recent-transactions">
        {recentTransaction.map((transaction) => (
          <div className="transaction" key={transaction.transactionId}>
            <div className="trans-head">
              <h3 className={transaction.transactionType}>
                {transaction.transactionType}{" "}
              </h3>
              <span>
                <Amount amount={transaction.amount} />
              </span>
            </div>
            <span>
              {transaction.transactionDate
                ? transaction.transactionDate.split("T")[0]
                : ""}
            </span>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentTransactions;
