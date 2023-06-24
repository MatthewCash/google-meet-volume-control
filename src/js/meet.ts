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

// Other scripts may change the volume back to 1 causing a volume bump before the interval sets it back to the desired volume. https://github.com/MatthewCash/google-meet-volume-control/issues/1 This attempts to fix the issue, but very short bumps may still be heard.
const observer = new MutationObserver(mutationList =>
    mutationList.forEach(mutation =>
        Array.from(mutation.addedNodes)
            .filter(node => node instanceof HTMLMediaElement)
            .forEach((element: HTMLMediaElement) => {
                element.volume = volume;
                element.addEventListener('volumechange', function () {
                    if (this.volume !== volume ** 2.5)
                        this.volume = volume ** 2.5;
                });
            })
    )
);

observer.observe(document.body, {
    childList: true
});
