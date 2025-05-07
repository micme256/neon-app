function authenticateMember(formData) {
  const sheetName = "authenticate";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  const memberId = formData.memberId;
  const password = formData.password;
  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === memberId && data[i][1] === password) {
      const payload = {
        userId: memberId,
        name: data[i][2],
        email: data[i][3],
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      const userData = {
        id: memberId,
        name: data[i][2],
        email: data[i][3],
        token: generateJwt(payload),
      };

      return ContentService.createTextOutput(
        JSON.stringify(userData)
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(
    JSON.stringify({ error: "Invalid member ID or password" })
  ).setMimeType(ContentService.MimeType.JSON);
}

const secretKey =
  PropertiesService.getScriptProperties().getProperty("SECRET_KEY");

function generateJwt(payload) {
  const header = {
    typ: "JWT",
    alg: "HS256",
  };

  const base64Header = Utilities.base64EncodeWebSafe(JSON.stringify(header));
  const base64Payload = Utilities.base64EncodeWebSafe(JSON.stringify(payload));

  const signature = Utilities.computeHmacSha256Signature(
    `${base64Header}.${base64Payload}`,
    secretKey
  );
  const base64Signature = Utilities.base64EncodeWebSafe(signature);

  return `${base64Header}.${base64Payload}.${base64Signature}`;
}
