const editData = (formData) => {
  formData.transactionDate = convertToDate(formData.transactionDate);

  try {
    const { transactionType, transactionId } = formData;
    const { data, sheet } = checkSheetData(transactionType);
    const headers = data[0];

    if (formData.transactionDate) {
      formData.transactionDate = convertToDate(formData.transactionDate);
    }

    let updated = false;
    const edittedData = {};

    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === transactionId) {
        const rowIndex = i + 1;
        Object.entries(formData).forEach(([key, value]) => {
          const colIndex = headers.indexOf(key) + 1;
          if (colIndex) {
            const dataCell = sheet.getRange(rowIndex, colIndex);
            dataCell.setValue(value);
            edittedData[key] = value;
          }
        });

        edittedData.transactionType = transactionType;

        updated = true;
        break;
      }
    }
    if (!updated) {
      throw new Error(`Transaction ID '${transactionId}' not found`);
    }
    //Request treasurer confirmation after loan approval
    if (
      formData.transactionType === "newLoan" &&
      formData.status === "approved"
    ) {
      const members = namesMapedById();
      const memberName = members.get(formData.memberId);
      edittedData.memberName = memberName;
      secondApprovalEmail(edittedData);
    }
    return edittedData;
  } catch (error) {
    return error;
  }
};

const secondApprovalEmail = (requestOptions) => {
  const { memberName, memberId, transactionId } = requestOptions;
  const email = "michaelnshimye@gmail.com";
  const subject = "New loan approved for Mr. " + memberName;

  const approveUrl =
    "https://script.google.com/macros/s/AKfycbyXfGOmWQDMmopVQcfpMlVEFU8PoDbzxltLIhtHZG3mKR7PJ_rfE_a-7n1dpwpYxxLx/exec";
  const body = `
Hello,

A new loan request has been approved and is pending your confirmation. Please go on and disburse the amount to the applicant and confirm the transaction.

LOAN  DETAILS:
- Transaction ID: ${transactionId}
- Member ID: ${memberId}

Click below to disburse the approved amount and confirm issuance of this loan:

${approveUrl}

Regards,  
NEON management system`;
  GmailApp.sendEmail(email, subject, body);
};
