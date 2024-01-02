document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM content loaded'); 
  document.getElementById('analyzeBtn').addEventListener('click', function() {
    console.log('Button clicked');

    // Get the current tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentTab = tabs[0];
      if (currentTab && currentTab.url) {
        // Send the URL to the background script
        chrome.runtime.sendMessage({ action: "sendRequest", url: currentTab.url }, function(response) {
          console.log('Received updateResult message:', response); // Log the entire response
          
          if (response && response.result) {
            document.getElementById('result').innerText = response.result; // Update the result in the 'result' div
            document.getElementById('responseHeader').innerText = response.result; // Update the h2 element
          } else if (response && response.error) {
            console.error('Error:', response.error);
          } else {
            console.error('Error: Invalid response format');
          }
        });
      } else {
        console.error('Error: Unable to get current tab URL');
      }
    });
  });
});
