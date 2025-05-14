import RecentActivityAdmn from "../../components/admin-pages-comps/RecentActivityAdmn";
import KeyMetrics from "../../components/KeyMetrics";
import useFetchData from "../../components/hooks/useFetchData";
import { useGeneralData } from "../../components/admin-pages-comps/GeneralDataContext";
import AdminNav from "./AdminNav";

const LoansAdmin = () => {
  const {
    data: transactions,
    loading,
    error,
  } = useFetchData({
    dataType: "transactions",
    transactionType: "loans",
    limit: 20,
  });
  const { metricObj } = useGeneralData();
  const metricsData = metricObj
    ? {
        "Active Loans": `${metricObj["Active Loans"]}`,
        "Loan Sum": metricObj["Loan Sum"],
      }
    : {};

  if (loading) {
    return (
      <>
        <KeyMetrics metricsData={metricsData} />
        <p className="loading">Loading...</p>
        <AdminNav />
      </>
    );
  }

  if (error) {
    return (
      <>
        <KeyMetrics metricsData={metricsData} />
        <p className="error">Error: {error}</p>
        <AdminNav />
      </>
    );
  }

  return (
    <>
      <KeyMetrics metricsData={metricsData} />
      {transactions && transactions.length > 0 ? (
        <RecentActivityAdmn recentActivity={transactions} />
      ) : (
        <p>No loan transactions found.</p>
      )}
      <AdminNav />
    </>
  );
};

export default LoansAdmin;
