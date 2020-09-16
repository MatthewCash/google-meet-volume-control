(() => {
    chrome.runtime.onInstalled.addListener(details => {
        if (details.reason !== 'install') {
            chrome.storage.sync.set({ volume: 1 });
        }
        chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
            chrome.declarativeContent.onPageChanged.addRules([
                {
                    conditions: [
                        new chrome.declarativeContent.PageStateMatcher({
                            pageUrl: { hostEquals: 'meet.google.com' }
                        })
                    ],
                    actions: [new chrome.declarativeContent.ShowPageAction()]
                }
            ]);
        });
    });
})();
