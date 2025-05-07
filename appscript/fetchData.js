const fetchData = (formData) => {
  try {
    const { dataType, transactionType, limit, memberId } = formData;
    const members = namesMapedById();

    if (dataType === "transactions") {
      let recentTransactions = [];
      const requiredTransactions = transactionType
        ? [transactionType]
        : ["loans", "savings", "penalties", "interest", "loanRepay"];

      for (const transactionType of requiredTransactions) {
        const transactionData = getTypeData(
          transactionType,
          limit,
          memberId,
          members
        );

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
      return getGeneralData();
    }
  } catch (error) {
    return error;
  }
};
// Retrieve transaction Data
const getTypeData = (transactionType, limit = 10, memberId, members) => {
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
      transaction.memberName = members.get(memberId) || "Unknown";
      return transaction;
    });

    return structuredData.slice(0, limit);
  } catch (error) {
    throw new Error(`Error fetching ${transactionType} data: ${error.message}`);
  }
};

const getGeneralData = () => {
  try {
    const { data: metricsData } = checkSheetData("metrics");
    const { data: accountsData } = checkSheetData("accounts");

    const [metricKeys, metricValues] = metricsData;
    const metricObj = {};
    metricKeys.forEach((key, index) => {
      metricObj[key] = metricValues[index];
    });

    return { accountsData, metricObj };
  } catch (error) {
    return error;
  }
};
