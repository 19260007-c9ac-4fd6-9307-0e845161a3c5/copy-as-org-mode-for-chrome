import { initializeStorageWithDefaults } from './storage';

chrome.runtime.onInstalled.addListener(async () => {
  // Here goes everything you want to execute after extension initialization

  await initializeStorageWithDefaults({});

  console.log('Extension successfully installed!');
});

// Log storage changes, might be safely removed
chrome.storage.onChanged.addListener((changes) => {
  for (const [key, value] of Object.entries(changes)) {
    console.log(
      `"${key}" changed from "${value.oldValue}" to "${value.newValue}"`,
    );
  }
});


chrome.contextMenus.create(
  {
    id: "copy-selection-as-org-mode",
    title: "Copy Selection as Org-Mode",
    contexts: ["selection"],
    documentUrlPatterns: ["<all_urls>"],  // "https://*" not works...
  },
  () => {
    if (browser.runtime.lastError)
      console.log(`Error: ${browser.runtime.lastError}`)
  }
)

chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log("pressed");
  if (info.menuItemId === "copy-selection-as-org-mode") {
    const title = tab.title;
    const url = tab.url;
    // Logic to copy title and URL as Org-Mode format
    console.log(`Title: ${title}, URL: ${url}`);
  }
});
