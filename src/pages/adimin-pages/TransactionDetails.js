import { formatDate } from "../../components/helper-functions/formatDate";
import { formatAmount } from "../../components/helper-functions/formatAmount";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetchFromSheet from "../../components/hooks/useFetchFromSheet";
import moment from "moment";

const formatKey = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase());
};

const TransactionDetails = () => {
  const location = useLocation();
  const [activity, setActivity] = useState(location.state?.activity);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [error, setError] = useState("");
  const { loading, fetchRequest, editRequest } = useFetchFromSheet();
  const [approvalStatusMsg, setApprovalStatusMsg] = useState("");

  useEffect(() => {
    const fetchLoanApplicationData = async () => {
      try {
        const response = await fetchRequest({
          dataType: "transactions",
          transactionType: "newLoan",
          transactionId: activity.transactionId,
          transactionDate: formatDate(new Date().toISOString().split("T")[0]),
        });
        if (response?.status !== "success") {
          throw new Error(response.message);
        }
        setActivity(response.data[0]);
      } catch (error) {
        setError(error.message);
      }
    };

    if (shouldFetchData) {
      fetchLoanApplicationData();
      setShouldFetchData(false);
    }
  }, [shouldFetchData]);

  const handleDecision = async (decision) => {
    setApprovalStatusMsg("");
    try {
      const requestOptions = {
        transactionId: activity.transactionId,
        transactionType: "newLoan",
        status: decision,
        memberId: activity.memberId,
        transactionDate: formatDate(new Date()),
      };
      const response = await editRequest(requestOptions);
      if (response.status === "success") {
        setApprovalStatusMsg("New loan " + decision + " successfully");
      } else {
        setApprovalStatusMsg("Failed to update status: " + response.message);
      }
    } catch (err) {
      setApprovalStatusMsg("Error: " + err.message);
    }
  };

  const isLoan = activity.transactionType === "loans";

  const renderValue = (value) => {
    if (typeof value === "number") return formatAmount(value);

    if (
      typeof value === "string" &&
      moment(value, moment.ISO_8601, true).isValid()
    ) {
      return formatDate(new Date(value));
    }

    return value || "N/A";
  };

  return (
    <>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <div className="transaction-details">
          <h2>
            Transaction Details{" "}
            {isLoan && (
              <button
                onClick={() => setShouldFetchData(true)}
                className="link-button"
              >
                [Loan application details]
              </button>
            )}
          </h2>
          <table>
            <tbody>
              {Object.entries(activity).map(([key, value]) => (
                <tr key={key}>
                  <td>
                    <strong>{formatKey(key)}:</strong>
                  </td>
                  <td>{renderValue(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!approvalStatusMsg &&
            activity.transactionType === "newLoan" &&
            (activity.status === "pending" ||
              activity.status === "approved") && (
              <div className="button-group">
                <button
                  className="approve-btn"
                  onClick={() =>
                    handleDecision(
                      activity.status === "approved" ? "active" : "approved"
                    )
                  }
                >
                  {activity.status === "pending" ? "APPROVE" : "CONFIRM"}
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleDecision("rejected")}
                >
                  REJECT
                </button>
              </div>
            )}
          {approvalStatusMsg && (
            <p className="loan-approval-message">{approvalStatusMsg}</p>
          )}
        </div>
      )}
    </>
  );
};

export default TransactionDetails;
