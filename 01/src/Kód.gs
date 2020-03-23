var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];
 

function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .createMenu('Admin')
      .addItem('Gimme recipe!', 'gimmeRecipe')
      .addToUi();
  openDialog();
}

function gimmeRecipe() {
  var html = HtmlService.createHtmlOutputFromFile('index').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(html, 'Gimme a recipe!');
}

function fetchRepices(ingredients, food) {
  var flag = true;
  var p = 1;
  while(flag) {
    var url = "http://www.recipepuppy.com/api/?i="+encodeURIComponent(ingredients)+"&q="+encodeURIComponent(food)+"&p="+p;
    var response = UrlFetchApp.fetch(url);
    var json = JSON.parse(response.getContentText());
    if(json.results.length == 0) break;
    renderData(json.results, p);
    p++;
  }
}

function onFormSubmit(obj) {
  clearSheet();
  fetchRepices(obj.ingredients, obj.food);
}

function renderData(foods, page) {
  var start = sheet.getRange("A2");
  for(var i=0; i<foods.length; i++) {
    var row = i+(page-1)*10;
    start.offset(row,0).setValue(foods[i].title);
    start.offset(row,1).setValue(foods[i].ingredients);
    start.offset(row,2).setValue(foods[i].href);
    if(foods[i].thumbnail != "") {
      start.offset(row,3).setValue('=IMAGE("'+foods[i].thumbnail+'")');
    }
  }
}
              
              
function clearSheet() {
  sheet.getRange("A2:D1000").clearContent();
}