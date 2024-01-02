document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('analyzeBtn').addEventListener('click', function() {
      chrome.runtime.sendMessage({ action: "sendRequest" });
    });
  });
  