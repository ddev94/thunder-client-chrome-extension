document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.create({
    url: chrome.runtime.getURL("index.html"),
    active: true, // Focus the new tab (set to false for background)
  });
});
