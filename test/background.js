chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "sendRequest") {
    fetch('http://127.0.0.1:5001/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: request.url }),
    })
    .then(response => response.json())
    .then(data => {
      // Send the data.result in the response
      sendResponse({ result: data.result });
    })
    .catch(error => {
      console.error('Error:', error);
      // Send an error message in the response
      sendResponse({ error: 'Error occurred while predicting.' });
    });
    
    // Ensure to return true to indicate that the sendResponse function will be called asynchronously
    return true;
  }
});
