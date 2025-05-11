function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}

const checkRequestType = (formData, requestType) => {
  try {
    switch (requestType) {
      case "authenticate":
        return authenticateMember(formData);
      case "fetchData":
        if (!formData) {
          return { data: "no authState" };
        }
        const result = fetchData(formData);
        const resultObj = {
          status: "success",
          message: "Data retrieved successfully",
          data: result,
        };
        return JSON.parse(JSON.stringify(resultObj));
      default:
        return {
          status: "error",
          message: "Invalid request type",
        };
    }
  } catch (error) {
    return {
      status: "error",
      message: "Internal server error",
    };
  }
};

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
