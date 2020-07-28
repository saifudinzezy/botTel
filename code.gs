//token for BotFather
var token = "1370535626:AAGfQUY-sXbK1A8VV6SiOA21yiMDIFstbys";
var url = "https://api.telegram.org/bot" + token;
//url script google scriptsheet
var webAppUrl = "https://script.google.com/macros/s/AKfycbyf3BgQdYdK7SUg1GE72gms2pG9n1KEkP703yvJkNOsz_olKzQ/exec";
//ssid google spreadsheet
var ssId = "1bsEaQWYu6csWwvYFGIBhKlumaBOIUE1b_dkcpFA1Tsc";


function getMe() {
  var response = UrlFetchApp.fetch(url + "/getMe");
  Logger.log(response.getContentText() ); 
}


function getUpdates() {
  var response = UrlFetchApp.fetch(url + "/getUpdates");
  Logger.log(response.getContentText());
}


function setWebhook() {
  var response = UrlFetchApp.fetch(url + "/setWebhook?url=" + webAppUrl);
  Logger.log(response.getContentText()); 
}


function sendText(id, test) {
  var response = UrlFetchApp.fetch(url + "/sendMessage?chat_id=" + id + "&text=" + text);
  Logger.log(response.getContentText()); 
}


function doGet(e) {
  return HtmlService.createHtmlOutput("Hello " + JSON.stringify(e));
}


function doPost(e) {
  var contents = JSON.parse(e.postData.contents);
  GmailApp.sendEmail(Session.getEffectiveUser().getEmail(),"Telegram Bot Update",JSON.stringify(contents,null,4));
  var text = contents.message.text;
  var id = contents.message.from.id;
  var name = contents.message.from.first_name + " " + contents.message.from.last_name;
  SpreadsheetApp.openById(ssId).appendRow([new Date(),id,name,text]);
  sendText(id, "Hello " + name);
    
}

//tester insert data from SpreadSheet
function onOpen() {
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];
sheet.appendRow(["a man", "a plan", "panama"]);
} 
