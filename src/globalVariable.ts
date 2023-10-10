import {Browser} from "puppeteer";

let currentProfileId = '';
let currentBrowser: Browser = null;

function changeCurrentProfileId(profileId: string) {
    currentProfileId = profileId
}

function changeCurrentBrowser(browser: Browser) {
    currentBrowser = browser;
}


export {currentBrowser, currentProfileId, changeCurrentProfileId, changeCurrentBrowser}