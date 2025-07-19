function doPost(e) {
  const action = e.parameter.action;

  if (action === 'upload') {
    return uploadFileToDrive(e);
  } else if (action === 'save') {
    return saveToSheet(e);
  } else {
    return ContentService.createTextOutput("Invalid action");
  }
}

function uploadFileToDrive(e) {
  try {
    const folder = DriveApp.getFolderById("YOUR_FOLDER_ID");
    const blob = Utilities.newBlob(Utilities.base64Decode(e.parameter.screenshot), e.parameter.mimeType, e.parameter.filename);
    const file = folder.createFile(blob);
    return ContentService.createTextOutput(file.getUrl());
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message);
  }
}

function saveToSheet(e) {
  try {
    const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name,
      data.phone,
      data.email,
      data.college,
      data.fileUrl
    ]);

    return ContentService.createTextOutput("Success");
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message);
  }
}
