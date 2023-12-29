// Load the content script dynamically and inject it into the webpage
const contentScript = document.createElement("script");
contentScript.src = chrome.runtime.getURL("content.js");
(document.head || document.documentElement).appendChild(contentScript);

// Send a message to the content script to check phishing
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    chrome.tabs.sendMessage(
        tabs[0].id,
        { message: "checkPhishing", url: url },
        function (response) {
            updatePopupContent(response);
        }
    );
});

// Function to update the content of the popup based on the phishing check result
function updatePopupContent(response) {
    const resultMessage = document.getElementById("result-message");

    if (response.error) {
        resultMessage.textContent = "Error checking phishing link";
    } else {
        resultMessage.textContent = response.isPhishing
            ? "Phishing Link Detected!"
            : "Safe Link";
    }
}
