chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    if (message.type === 'notification') {
        chrome.notifications.create('', message.options);
    }
});