console.log("inside popup.js");


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('analyzeBtn').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: "sendRequest" });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateResult") {
    document.getElementById('result').innerText = "Prediction Result: " + request.result;
  }
});

