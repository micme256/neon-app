function authenticateMember(formData) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("authenticate");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const memberIdIndex = headers.indexOf("No/ID");
  const passwordIndex = headers.indexOf("Password");
  const nameIndex = headers.indexOf("Name");
  const emailIndex = headers.indexOf("email");
  const postIndex = headers.indexOf("Position");

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (
      row[memberIdIndex] === formData.memberId &&
      row[passwordIndex] === formData.password
    ) {
      const payload = {
        userId: row[memberIdIndex],
        name: row[nameIndex],
        email: row[emailIndex],
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      const token = generateJwt(payload);

      return {
        status: "success",
        data: {
          id: row[memberIdIndex],
          name: row[nameIndex],
          email: row[emailIndex],
          role:
            row[postIndex] === "SECRETARY"
              ? "editor"
              : row[postIndex] === "MEMBER"
              ? "user"
              : "admin",
          token: token,
        },
      };
    }
  }

  return { status: "error", message: "Invalid member ID or password" };
}

function generateJwt(payload) {
  const header = { typ: "JWT", alg: "HS256" };
  const secretKey =
    PropertiesService.getScriptProperties().getProperty("SECRET_KEY");

  const base64Header = Utilities.base64EncodeWebSafe(JSON.stringify(header));
  const base64Payload = Utilities.base64EncodeWebSafe(JSON.stringify(payload));
  const signature = Utilities.computeHmacSha256Signature(
    `${base64Header}.${base64Payload}`,
    secretKey
  );
  const base64Signature = Utilities.base64EncodeWebSafe(signature);

  return `${base64Header}.${base64Payload}.${base64Signature}`;
}
