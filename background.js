chrome.runtime.onInstalled.addListener(() => {
  //create context menu
  chrome.contextMenus.create({
      id: "wikipedia",
      title: "Open video in Indivous", 
      contexts: ["link"], 
      targetUrlPatterns: ["https://www.youtube.com/watch*"]
  })
});

//listener for context menu
chrome.contextMenus.onClicked.addListener(function(info, tab){
  //the URL that will be added to based on the selection

  baseURL = "https://vid.puffyan.us/";
  videoURL = info.linkUrl
  var newURL = baseURL + videoURL.slice(24); // remove "https://www.youtube.com/" to just get "watch?v=whatever"
  //create the new URL in the user's browser
  chrome.tabs.create({ url: newURL });
})