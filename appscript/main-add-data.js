/*Data sheets are nemed according to transaction types they store */

//Sending data to sheets
const addData = (formData) => {
  formData.transactionDate = convertToDate(formData.transactionDate);

  try {
    const { transactionType } = formData;
    const { data, sheet } = checkSheetData(transactionType);
    const headers = data[0];

    const rowIndex = sheet.getLastRow() + 1;

    formData.transactionId = generateTransactionId(
      transactionType.slice(0, 3).toUpperCase()
    );

    const addedData = {}; //Response data on success

    Object.entries(formData).forEach(([key, value]) => {
      const colIndex = headers.indexOf(key) + 1;
      if (colIndex) {
        const dataCell = sheet.getRange(rowIndex, colIndex);
        dataCell.setValue(value);
        addedData[key] = value;
      }
    });
    // ⏪ Recurse interest repayment if it's a loanRepay transaction
    if (transactionType === "loanRepay") {
      const pendingInterest = formData.pendingInterest;
      //When the loan balance changes, any unpaid interest is recorded somewhere and continuing interest calculated based on remaining balance
      if (pendingInterest > 0 && formData.loanType === "instant-loan") {
        recordInterestArrears({
          ...formData,
          transactionType: "interestArrears",
          amount: pendingInterest,
        });
      }
      if (formData.interest > 0) {
        const interestForm = {
          ...formData,
          transactionType: "interest",
          amount: formData.interest,
        };
        const interestData = addData(interestForm);
        addedData.interest = interestData.amount;
        addedData.interestTransId = interestData.transactionId;
      }
    }
    addedData.transactionType = transactionType;

    return addedData;
  } catch (error) {
    return error;
  }
};

const recordInterestArrears = (data) => {
  addData(data);
};
