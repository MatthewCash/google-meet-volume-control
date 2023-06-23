import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener(details => {
    if (details.reason !== 'install') {
        browser.storage.sync.set({ volume: 1 });
    }
});
