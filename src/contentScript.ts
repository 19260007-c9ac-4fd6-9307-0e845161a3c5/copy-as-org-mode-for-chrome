// content.js
chrome.runtime.sendMessage({ greeting: "你好" }, function(response) {
    console.log("收到回复:", response.farewell);
});
