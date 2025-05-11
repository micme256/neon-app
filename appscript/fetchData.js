const fetchData = (formData) => {
  try {
    const { dataType, transactionType, limit, memberId } = formData;
    if (dataType === "transactions") {
      let recentTransactions = [];
      const requiredTransactions = transactionType
        ? [transactionType]
        : ["loans", "savings", "penalties", "interest", "loanRepay"];

      for (const transactionType of requiredTransactions) {
        const transactionData = getTypeData(transactionType, limit, memberId);

        if (transactionData instanceof Error) {
          throw transactionData;
        }

        transactionData.forEach((record) => {
          record.transactionType = transactionType;
        });
        recentTransactions.push(...transactionData);
      }

      recentTransactions.sort(
        (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
      );

      const requiredNumb = recentTransactions.slice(0, limit);

      if (requiredNumb.length === 0) {
        throw new Error("No records found");
      }
      return requiredNumb;
    } else {
      return getGeneralData(memberId);
    }
  } catch (error) {
    return error;
  }
};
// Retrieve transaction Data
const getTypeData = (transactionType, limit = 10, memberId) => {
  try {
    const { data } = checkSheetData(transactionType);
    const headers = data.shift();
    const memberIdColumnIndex = headers.indexOf("memberId");
    const dateColumnIndex = headers.indexOf("transactionDate");

    const memberData = data.filter(
      (record) => record[memberIdColumnIndex] === memberId
    );
    const dateSorted = memberData.sort(
      (a, b) => new Date(b[dateColumnIndex]) - new Date(a[dateColumnIndex])
    );

    const structuredData = dateSorted.map((row) => {
      const transaction = {};
      headers.forEach((header, index) => {
        transaction[header] = row[index];
      });
      return transaction;
    });

    return structuredData.slice(0, limit);
  } catch (error) {
    throw new Error(`Error fetching ${transactionType} data: ${error.message}`);
  }
};

const getGeneralData = (memberId) => {
  try {
    const { data } = checkSheetData("Database");
    const headers = data[0];
    const columnIndexes = {
      memberId: headers.indexOf("No/ID"),
      savings: headers.indexOf("Total Savings"),
      loans: headers.indexOf("Loan Bal"),
      interestEarned: headers.indexOf("Interest Earned"),
      loanInterest: headers.indexOf("Pending Interest"),
    };

    const memberData = data.find(
      (row) => row[columnIndexes.memberId] === memberId
    );

    if (!memberData) {
      throw new Error("Member not found");
    }

    return {
      "Total Savings": memberData[columnIndexes.savings],
      "Loan Bal": memberData[columnIndexes.loans],
      "Interest Earned": memberData[columnIndexes.interestEarned],
      "Pending Interest": memberData[columnIndexes.loanInterest],
    };
  } catch (error) {
    throw new Error(`Error fetching member data: ${error.message}`);
  }
};

const checkSheetData = (sheetName) => {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      throw new Error(`Transaction '${sheetName}' not found`);
    }
    const data = sheet.getDataRange().getValues();
    return { data, sheet };
  } catch (error) {
    return error;
  }
};
