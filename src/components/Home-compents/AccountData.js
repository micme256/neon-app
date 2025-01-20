import React from "react";
import Amount from "../other-sub-comps/Amount";

const AccountData = ({ accountData }) => {
  return (
    <>
      {accountData && (
        <section className="account-data">
          {Object.entries(accountData).map(([key, value]) => {
            if (value) {
              return (
                <div className="data-item" key={key}>
                  <h3 className={key}>{key}</h3>
                  {typeof value === "number" ? (
                    <Amount amount={value} />
                  ) : (
                    <p>{value}</p>
                  )}
                </div>
              );
            } else {
              return null;
            }
          })}
        </section>
      )}
    </>
  );
};

export default AccountData;
