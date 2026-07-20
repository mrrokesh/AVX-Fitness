/**
 * Google Apps Script Web App for appending form rows to sheet tabs.
 *
 * Setup:
 * 1. Create a Google Sheet (e.g. "AVX Fitness Leads").
 * 2. Extensions → Apps Script → paste this file.
 * 3. Set Script Properties: WEBAPP_SECRET, SHEET_NAME (default Registrations)
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone (the secret protects writes)
 * 5. Copy the web app URL into GOOGLE_SHEETS_WEBAPP_URL
 * 6. Put the same secret in GOOGLE_SHEETS_WEBAPP_SECRET
 *
 * Tabs used by the site: Registrations, Contacts, Bookings
 * Never put the spreadsheet ID or service credentials in frontend code.
 */

var REGISTRATION_HEADERS = [
  "submissionId",
  "submissionTimestamp",
  "fullName",
  "email",
  "countryCode",
  "whatsappNumber",
  "age",
  "gender",
  "city",
  "preferredLanguage",
  "height",
  "currentWeight",
  "targetWeight",
  "fitnessLevel",
  "fitnessGoal",
  "workoutPreference",
  "programSelected",
  "trainerSelected",
  "preferredBranch",
  "availableWorkoutTime",
  "consultationType",
  "preferredDate",
  "preferredTime",
  "additionalMessage",
  "consentStatus",
  "marketingConsent",
  "leadSource",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "currentLeadStatus",
  "assignedStaffMember",
  "followUpDate",
  "internalNotes",
];

var CONTACT_HEADERS = [
  "submissionId",
  "submissionTimestamp",
  "formType",
  "fullName",
  "email",
  "phone",
  "message",
  "privacyAccepted",
];

var BOOKING_HEADERS = [
  "submissionId",
  "submissionTimestamp",
  "formType",
  "fullName",
  "email",
  "phone",
  "trainerSlug",
  "consultationType",
  "preferredDate",
  "preferredTime",
  "programSelected",
  "preferredBranch",
  "notes",
  "timezone",
  "status",
  "meetLink",
  "calendarEventId",
];

function headersForSheet(sheetName) {
  if (sheetName === "Contacts") return CONTACT_HEADERS;
  if (sheetName === "Bookings") return BOOKING_HEADERS;
  if (sheetName === "Registrations") return REGISTRATION_HEADERS;
  return null;
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var expected = PropertiesService.getScriptProperties().getProperty("WEBAPP_SECRET");
    if (!expected || body.secret !== expected) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Unauthorized" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var sheetName =
      body.sheetName ||
      PropertiesService.getScriptProperties().getProperty("SHEET_NAME") ||
      "Registrations";
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
    var row = body.row || {};

    var headers = headersForSheet(sheetName);
    if (!headers) {
      headers = Object.keys(row);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    sheet.appendRow(
      headers.map(function (key) {
        var value = row[key];
        if (Array.isArray(value)) return value.join("; ");
        return value == null ? "" : value;
      })
    );

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, sheetName: sheetName })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
