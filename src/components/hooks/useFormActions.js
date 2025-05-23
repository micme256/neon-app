import useFetchFromSheet from "./useFetchFromSheet";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../helper-functions/formatDate";

const useFormActions = () => {
  const { loading, addRequest, editRequest, deleteRequest } =
    useFetchFromSheet();
  const navigate = useNavigate();

  const submitForm = async (formData, isEditing) => {
    try {
      formData.transactionDate = formatDate(formData.transactionDate);
      if (formData.transactionType === "newLoan") {
        formData.status = "active";
      }

      const response = isEditing
        ? await editRequest(formData)
        : await addRequest(formData);

      if (response.status === "success") {
        navigate("/data-feedback", { state: { response } });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      navigate("/data-feedback", {
        state: {
          response: {
            status: "error",
            message: error.message || "Unexpected error occurred.",
          },
        },
      });
    }
  };

  const deleteTransaction = async (transaction) => {
    try {
      const response = await deleteRequest(transaction);
      if (response.status === "success") {
        navigate("/data-feedback", { state: { response, undoMode: true } });
      }
    } catch (error) {
      navigate("/data-feedback", {
        state: {
          response: {
            status: "error",
            message: error.message || "Unexpected error occurred.",
          },
        },
      });
    }
  };

  const loadEditor = (transaction) => {
    navigate("/trans-edit", {
      state: { transToEdit: transaction, isEditing: true },
    });
  };

  const loadLoanClearer = (loan) => {
    loan.transactionType = "loanRepay";
    navigate("/loan-clearing", {
      state: { loanToClear: loan },
    });
  };

  const processLoanFormData = (formData) => {
    formData.forLoanWithId = formData.transactionId;
    delete formData.transactionId;
    formData.amount = formData.amountPaid;
    if (formData.amountPaid <= 0) {
      //IF ONLY INTEREST IS PAID
      formData.transactionType = "interest";
      formData.amount = formData.interest;
    }
    return formData;
  };

  return {
    loading,
    submitForm,
    deleteTransaction,
    loadEditor,
    loadLoanClearer,
    processLoanFormData,
  };
};

export default useFormActions;
