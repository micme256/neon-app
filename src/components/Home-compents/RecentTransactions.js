import React from "react";
import { v4 as uuidv4 } from "uuid";
import Amount from "../other-sub-comps/Amount";

const RecentTransactions = () => {
  const transactionsArr = [
    {
      type: "Deposit",
      date: "07-09-2024",
      amount: 3000,
      id: uuidv4(),
    },
    {
      type: "withdraw",
      date: "07-09-2024",
      amount: 3000,
      id: uuidv4(),
    },
    {
      type: "shares",
      date: "07-09-2024",
      amount: 3000,
      id: uuidv4(),
    },
  ];
  return (
    <>
      <br />
      <h2>Recent Transactions</h2>
      <br />
      <section className="recent-transactions">
        {transactionsArr.map((transaction) => (
          <div className="transaction" key={transaction.id}>
            <div className="trans-head">
              <h3 className={transaction.type}>{transaction.type} </h3>
              <span>
                <Amount amount={transaction.amount} />
              </span>
            </div>
            <span>{transaction.date}</span>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentTransactions;
