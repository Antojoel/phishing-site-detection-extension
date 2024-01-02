console.log("inside the background.js");

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
      chrome.tabs.sendMessage(sender.tab.id, { action: "updateResult", result: data.result });
    })
    .catch(error => {
      console.error('Error:', error);
      chrome.tabs.sendMessage(sender.tab.id, { action: "updateResult", result: "Error occurred while predicting." });
    });
  }
});
