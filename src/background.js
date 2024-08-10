chrome.runtime.onInstalled.addListener(() => {
    // Initialize storage
    chrome.storage.sync.set({ webpages: [] });
  });
  
  function addWebpage(url) {
    chrome.storage.sync.get({ webpages: [] }, (result) => {
      const webpages = result.webpages;
      webpages.push(url);
      chrome.storage.sync.set({ webpages });
    });
  }
  
  function getRandomWebpage(callback) {
    chrome.storage.sync.get({ webpages: [] }, (result) => {
      const webpages = result.webpages;
      if (webpages.length > 0) {
        const randomIndex = Math.floor(Math.random() * webpages.length);
        callback(webpages[randomIndex]);
      } else {
        callback(null);
      }
    });
  }
  
  // Expose functions for popup script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'addWebpage') {
      addWebpage(request.url);
      sendResponse({ status: 'success' });
    } else if (request.action === 'getRandomWebpage') {
      getRandomWebpage((url) => {
        sendResponse({ url });
      });
      return true; // Keep the messaging channel open for asynchronous response
    }
  });
  