import Amount from "./elements/Amount";

const BalanceCard = ({ memberData }) => {
  return (
    <div className="balance-card">
      <h1>NEON FRATERNITY</h1>
      <div className="balances">
        <div className="account-bal">
          <h1>Savings</h1>
          <Amount amount={memberData["Total Savings"]} />
        </div>
        <div className="total-shares">
          <h1>Loan Bal</h1>
          <p>{memberData["Loan Bal"]}</p>
        </div>
      </div>
      <div className="interest">
        <h1>Interest Earned</h1>
        <Amount amount={memberData["Interest Earned"]} />
      </div>
    </div>
  );
};

export default BalanceCard;
