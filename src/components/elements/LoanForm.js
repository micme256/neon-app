import React from "react";
import FormInput from "./FormInput";

const LoanForm = ({ handleSubmit, placeholder }) => {
  const inputAttributes = [
    {
      type: "text",
      placeholder: placeholder,
      name: "amount",
      label: "Enter Amount",
      value: "",
      checked: false,
      options: [],
    },
  ];
  return (
    <>
      <form className="loan-form" onSubmit={handleSubmit}>
        <FormInput inputAttributes={inputAttributes} />
        <button type="submit">APPLY</button>
      </form>
    </>
  );
};

export default LoanForm;
