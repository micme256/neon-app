import { useState } from "react";
import Amount from "../elements/Amount";
import { formatDate } from "../helper-functions/formatDate";
import useFormActions from "../hooks/useFormActions";
import { formatAmount } from "../helper-functions/formatAmount";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useLocation, useNavigate } from "react-router-dom";

const RecentActivityAdmn = ({ recentActivity }) => {
  const auth = useAuthUser();
  const editor = auth.role === "editor";

  const navigate = useNavigate();
  const location = useLocation();

  const [actionButtonsState, setActionButtonsState] = useState({});

  const { deleteTransaction, loadEditor, loadLoanClearer } = useFormActions();

  const toggleActionButtons = (activityId) => {
    setActionButtonsState((prevState) => ({
      [activityId]: !prevState[activityId],
    }));
  };

  return (
    <div className="recent-activity">
      {recentActivity.map((activity) => (
        <div
          className="activity-with-btns"
          key={activity.transactionId}
          onClick={(e) => {
            e.stopPropagation();
            if (editor) toggleActionButtons(activity.transactionId);
          }}
        >
          <div className="activity" tabIndex="0">
            <div className="activity-left">
              <div className="fname">{activity.memberName}</div>
              <div
                className={`trans-type loan-type ${activity.transactionType}`}
              >
                {activity.transactionType && activity.loanType
                  ? `${activity.transactionType}-${activity.loanType}`
                  : activity.transactionType || activity.loanType || null}
              </div>
              <Amount amount={activity.amount} />
            </div>
            <div className="activity-right">
              {activity.status && (
                <div className={`${activity.status}`}>{activity.status}</div>
              )}
              <div className="date">
                {formatDate(new Date(activity.transactionDate))}
              </div>
              {activity.loanBalance && (
                <div className="bal">
                  Bal: {formatAmount(activity.loanBalance)}
                </div>
              )}
              {activity.pendingInterest && (
                <div>Interest: {formatAmount(activity.pendingInterest)}</div>
              )}
            </div>
          </div>
          {editor && actionButtonsState[activity.transactionId] && (
            <div className="button-group">
              <button
                key={`${activity.transactionId}-undo`}
                className="trans-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTransaction(activity);
                }}
              >
                Delete
              </button>
              <button
                key={`${activity.transactionId}-edit`}
                className="trans-edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  loadEditor(activity);
                }}
              >
                Edit
              </button>
              {(activity?.status === "active" ||
                activity?.status === "overdue") && (
                <button
                  key={`${activity.transactionId}-clear`}
                  className="trans-clear-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    loadLoanClearer(activity);
                  }}
                >
                  Pay
                </button>
              )}
              {location.pathname === "/admin-loans" &&
                activity?.transactionType === "loans" && (
                  <button
                    key={`${activity.transactionId}-details`}
                    className="trans-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/admin-loans/transaction-details", {
                        state: { activity: activity },
                      });
                    }}
                  >
                    Details
                  </button>
                )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecentActivityAdmn;
