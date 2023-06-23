# google-meet-volume-control

Allows a global volume to be set for all Meet participants (client side)

## Installation with Chrome Web Store

Visit the [Chrome Web Store Listing](https://chrome.google.com/webstore/detail/google-meet-volume-contro/nkbnlgonoekhmldnihfdpakhhjhmdkbd)

## Manual Installation from Releases

Visit the [Releases Page](https://github.com/MatthewCash/google-meet-volume-control/releases) and follow the provided instructions

## Manual Build & Installation

### With Nix (Firefox only)

1. Run `nix build`
2. Load addon from `./result/extension/meet-volume-control.zip`

### Manually

1. Install dependencies with `npm install`
2. Build for your browser with `npm run build:firefox` or `npm run build:chrome`
3. Pack into zip with `npm run pack`
4. Load addon from `./ext-out/meet-volume-control.zip`
