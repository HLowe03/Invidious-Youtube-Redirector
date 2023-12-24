chrome.runtime.onInstalled.addListener(() => {
  // When clickd on URL this works
  chrome.contextMenus.create({
    id: "linkContext",
    title: "Open video in Indivous",
    contexts: ["link"],
    targetUrlPatterns: ["https://www.youtube.com/watch*"]
  });

  // When clicked on tab, this runs
  chrome.contextMenus.create({
    id: "tabContext",
    title: "Open current tab in Indivous",
    contexts: ["page"],
    documentUrlPatterns: ["https://www.youtube.com/watch*"]
  });
});


// Listener for context menu
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  // The URL that will be added to based on the selection

  var baseURL = "https://vid.puffyan.us/";
  let videoURL = "";
  var newURL = ""

  if (info.menuItemId == "linkContext") {
    // If clicked on link
    videoURL = info.linkUrl;

    newURL = baseURL + videoURL.slice(24); // Remove "https://www.youtube.com/" to just get "watch?v=whatever"
    //chrome.tabs.create({ url: newURL });
  } 

  else if (info.menuItemId == "tabContext") {
    // If clicked on page

    // Use the chrome.tabs API to get the URL of the currently active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        videoURL = tabs[0].url;

        if (videoURL) {
          console.log(videoURL)
          newURL = baseURL + videoURL.slice(24); // Remove "https://www.youtube.com/" to get "watch?v=whatever"
        }
      }
    })
  }


  // to delay so async func (tabs.query) can run if clicked on page
  while (newURL == "") { 
    // pass
    console.log("Stuck")
  }
  chrome.tabs.create({ url: newURL });
})