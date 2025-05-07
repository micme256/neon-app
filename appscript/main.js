function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}

const checkRequestType = (formData, requestType) => {
  switch (requestType) {
    case "authenticate":
      try {
        return authenticateMember(formData);
      } catch (error) {
        return ContentService.createTextOutput(
          "Internal server error"
        ).setMimeType(ContentService.MimeType.TEXT);
      }
  }
};
