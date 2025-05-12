const namesMapedById = () => {
  const sheetName = "Database";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const memberIdIndex = headers.indexOf("No/ID");
  const memberNameIndex = headers.indexOf("first Name");

  const memberMap = new Map();

  for (let i = 0; i < data.length; i++) {
    const memberId = data[i][memberIdIndex];
    const memberName = data[i][memberNameIndex];
    memberMap.set(memberId, memberName);
  }

  return memberMap;
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
