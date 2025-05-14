import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import RecentActivityAdmn from "../../components/admin-pages-comps/RecentActivityAdmn";
import TransactionForm from "../../components/admin-pages-comps/TransactionForm";
import useFetchData from "../../components/hooks/useFetchData";
import AdminNav from "./AdminNav";

const Transactions = () => {
  const auth = useAuthUser();
  const editor = auth?.role === "editor";
  const {
    data: transactions,
    loading,
    error,
  } = useFetchData({
    dataType: "transactions",
    limit: 20,
  });

  return (
    <>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {transactions && transactions.length > 0 && (
        <RecentActivityAdmn recentActivity={transactions} />
      )}
      {editor && <TransactionForm />}
      <AdminNav />
    </>
  );
};

export default Transactions;
