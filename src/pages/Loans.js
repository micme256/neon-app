import Header from "./Header";
import Nav from "./Nav";
import useFetchData from "../components/hooks/useFetchData";
import RecentActivity from "../components/RecentActivity";
import KeyMetrics from "../components/KeyMetrics";
import { useGeneralData } from "../components/MemberContext";

const Loans = () => {
  const { metricObj } = useGeneralData();
  const metricsData = metricObj
    ? {
        "Loan Bal": metricObj["Loan Bal"],
        "Pending Interest": metricObj["Pending Interest"],
      }
    : {};
  const {
    data: transactions,
    loading,
    error,
  } = useFetchData({
    dataType: "transactions",
    transactionType: "loans",
    memberId: JSON.parse(localStorage.getItem("_auth_state")).id,
    limit: 15,
  });
  const memberId = JSON.parse(localStorage.getItem("_auth_state")).id;
  const memberName = JSON.parse(localStorage.getItem("_auth_state")).name;
  const link =
    "https://docs.google.com/forms/d/e/1FAIpQLSceWnqIQPTAT29fgbe3rAb4RoEe3RlveZ4t3F4YSQ1AU01YgA/viewform?usp=pp_url&entry.1962074682=" +
    memberId +
    "&entry.971271702=" +
    memberName;
  if (loading) {
    return (
      <>
        <Header />
        <KeyMetrics metricsData={metricsData} />
        <a
          className="loans-button"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          APPLY FOR A NEW LOAN <span className="external-icon">↗</span>
        </a>
        <p className="loading">Loading...</p>
        <Nav />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <KeyMetrics metricsData={metricsData} />
        <a
          className="loans-button"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          APPLY FOR A NEW LOAN <span className="external-icon">↗</span>
        </a>
        <p className="error">Error: {error}</p>
        <Nav />
      </>
    );
  }

  return (
    <>
      <Header />
      <KeyMetrics metricsData={metricsData} />
      <a
        className="loans-button"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        APPLY FOR A NEW LOAN <span className="external-icon">↗</span>
      </a>
      {transactions && transactions.length > 0 ? (
        <RecentActivity recentActivity={transactions} />
      ) : (
        <p>No loan transactions found.</p>
      )}
      <Nav />
    </>
  );
};

export default Loans;
