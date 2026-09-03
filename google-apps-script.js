function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Date Plans') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Date Plans');
  if (sheet.getLastRow() === 0) sheet.appendRow(['Submitted At', 'Name', 'Invited By', 'Date', 'Place', 'Time']);
  const p = e.parameter;
  sheet.appendRow([p.submittedAt || new Date(), p.name || 'Mayabi', p.invitedBy || 'Hasib', p.date || '', p.place || '', p.time || '']);
  return ContentService.createTextOutput(JSON.stringify({status:'success'})).setMimeType(ContentService.MimeType.JSON);
}
