import browser from 'webextension-polyfill';

let volume = 1;

const setAllVolume = (volume: number) => {
    const adjustedVolume = volume ** 2.5;
    document
        .querySelectorAll<HTMLMediaElement>('audio, video')
        .forEach(el => (el.volume = adjustedVolume ?? 1));
};

browser.storage.sync
    .get(['volume'])
    .then(res => void (volume = res.volume ?? 1));

browser.storage.onChanged.addListener(changes => {
    if (changes['volume']) volume = changes['volume'].newValue;

    setAllVolume(volume);
});

setInterval(() => {
    setAllVolume(volume);
}, 100);
