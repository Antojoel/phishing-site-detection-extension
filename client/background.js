chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentTab = tabs[0];
      chrome.tabs.sendMessage(currentTab.id, { action: "getURL" });
    });
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "sendRequest") {
      fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: request.url }),
      })
      .then(response => response.json())
      .then(data => {
        alert("Prediction Result: " + data.result);
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Error occurred while predicting.");
      });
    }
  });
  