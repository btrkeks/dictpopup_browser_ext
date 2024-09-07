chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message in background script:', request);
  if (request.action === "showDefinition") {
    console.log('Sending native message with text:', request.text);
    chrome.runtime.sendNativeMessage('com.github.ajatt_tools.dictpopup',
      { text: request.text },
      function(response) {
        if (chrome.runtime.lastError) {
          console.error("Native messaging error:", chrome.runtime.lastError.message);
          sendResponse({error: chrome.runtime.lastError.message});
        } else {
          console.log("Received response from native host:", response);
          sendResponse({status: "completed", response: response});
        }
      }
    );
    return true; // Keeps the message channel open for the asynchronous response
  }
});
