import { useLocation } from "react-router-dom";
import TransactionForm from "../../components/admin-pages-comps/TransactionForm";

const TransEditing = () => {
  const location = useLocation();
  const { transToEdit, isEditing } = location.state || {};
  return (
    <>
      <TransactionForm
        initialTransaction={transToEdit}
        formHeader="EDIT TRANSACTION"
        isEditing={isEditing}
      />
    </>
  );
};

export default TransEditing;
