import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import LoanForm from "./Forms/LoanForm";
import { useState, useEffect } from "react";
import LoanActivity from "./other-sub-comps/LoanActivity";
import CurrentLoan from "./other-sub-comps/CurrentLoan";
import useApiFetch from "./hooks/useApiFetch";

const Loans = () => {
  const interestForLongTermLoan = 0.38;
  const maximumShortTermAmount = 500000;

  const interestForShortTermLoan = 0.6;
  const minmumLongTermAmount = 1000000;

  const [showLoanForm, setShowLoanForm] = useState(false);
  const [interestRate, setInterestRate] = useState(null);
  const [loanLimit, setloanLimit] = useState(null);

  const { sendAnyRequest, loading } = useApiFetch();
  const formData = new FormData();
  formData.append("requestType", "fetchData");
  formData.append("dataType", "transactions");
  formData.append("transactionType", "loans");
  formData.append(
    "memberId",
    JSON.parse(localStorage.getItem("_auth_state")).id
  );

  const [loanActivityArr, setLoanActivityArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendAnyRequest(formData);
        setLoanActivityArr(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const loadLongTermLoanForm = () => {
    setShowLoanForm(true);
    setInterestRate(interestForLongTermLoan);
    setloanLimit(`Minimum amount is ${minmumLongTermAmount}`);
  };

  const loadShortTermForm = () => {
    setShowLoanForm(true);
    setInterestRate(interestForShortTermLoan);
    setloanLimit(`Maximum amount is ${maximumShortTermAmount}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData, interestRate);
  };

  return (
    <>
      <Header />
      <br />
      {loading && <p>Loading...</p>}
      {loanActivityArr && (
        <>
          <CurrentLoan loanActivityArr={loanActivityArr} />

          <div className="loans-buttons">
            <button
              className="short-term-loan-btn"
              onClick={loadLongTermLoanForm}
            >
              Apply for a long-term loan @ 38% annual interest
            </button>
            <button className="long-term-loan-btn" onClick={loadShortTermForm}>
              Apply for a short-term loan @ 5% monthly interest
            </button>
          </div>
          <br />
          {showLoanForm && (
            <LoanForm handleSubmit={handleSubmit} placeholder={loanLimit} />
          )}
          <LoanActivity loanActivityArr={loanActivityArr} />
        </>
      )}
      <Nav />
    </>
  );
};

export default Loans;
