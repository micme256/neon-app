import RecentActivityAdmn from "./RecentActivityAdmn";
import useFetchData from "../hooks/useFetchData";

const LoanActivity = () => {
  const {
    data: transactions,
    loading,
    error,
  } = useFetchData({
    dataType: "transactions",
    transactionType: "loans",
    limit: 20,
  });
  return (
    <>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : transactions && transactions.length > 0 ? (
        <RecentActivityAdmn recentActivity={transactions} />
      ) : (
        <p>No loan transactions found.</p>
      )}
    </>
  );
};

export default LoanActivity;
