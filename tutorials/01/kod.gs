var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];

function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('Preview')
      .addItem('Enter numerical data', 'enterNumericalData')
      .addItem('Enter text', 'enterText')
      .addItem('Enter city', 'enterCity')
      .addItem('Execute the tasks', 'executeTheTasks')
      .addToUi();
}

function enterNumericalData() {
  var data = Browser.inputBox("Enter numerical data", Browser.Buttons.OK_CANCEL);
  sheet.getRange("A1").setValue(data);
  sheet.getRange("A4").setValue(data);
}

function enterText() {
  var data = Browser.inputBox("Enter text", Browser.Buttons.OK_CANCEL);
  sheet.getRange("A2").setValue(data);
}

function enterCity() {
  var data = Browser.inputBox("Enter city", Browser.Buttons.OK_CANCEL);
  sheet.getRange("A3").setValue(data);
}

function executeTheTasks() {
  subtask1();
  subtask2();
  subtask3();
  subtask4();
}

function subtask1() {
  var data = sheet.getRange("A1").getValue();
  sheet.getRange("B1").setValue(25*data);
}

function subtask2() {
  var data = sheet.getRange("A2").getValue();
  sheet.getRange("B2").setValue(LanguageApp.translate(data, 'en', 'cs'));
}

function subtask3() {
  var data = sheet.getRange("A3").getValue();
  showMap(data);
}

function subtask4() {
  var text = UrlFetchApp.fetch("https://api.exchangeratesapi.io/latest").getContentText();
  var json = JSON.parse(text);
  var data = sheet.getRange("A4").getValue();
  sheet.getRange("B4").setValue(json.rates.CZK*data);
}

function showMap(city) {
  // remove previous images
  var images = SpreadsheetApp.getActiveSpreadsheet().getImages();
  for (var i = 0; i < images.length; i++) {
    images[i].remove();
  }
  // show a place
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var map = Maps.newStaticMap().addMarker(city);
  sheet.insertImage(map.getBlob(), 3, 3);
}