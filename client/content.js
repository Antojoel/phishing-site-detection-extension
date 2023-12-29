// Content script is injected into the web page

// Listen for a click on the extension icon
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
        // Get the current tab's URL and send it to the background script
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                const url = tabs[0].url;
                chrome.runtime.sendMessage(
                    { message: "checkPhishing", url: url },
                    function (response) {
                        sendResponse(response);
                    }
                );
            }
        );
    }
});
