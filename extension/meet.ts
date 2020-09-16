(() => {
    let volume = 1;

    const setAllVolume = (volume: number) => {
        document
            .querySelectorAll('audio')
            .forEach(el => (el.volume = volume ?? 1));
    };

    chrome.storage.sync.get(['volume'], res => void (volume = res.volume ?? 1));

    chrome.storage.onChanged.addListener(changes => {
        if (changes['volume']) volume = changes['volume'].newValue;

        setAllVolume(volume);
    });

    setInterval(() => {
        setAllVolume(volume);
    }, 100);
})();
