import {Browser} from "puppeteer";

let currentBrowser: Browser = null;

function changeCurrentBrowser(browser: Browser) {
    currentBrowser = browser;
}


export {currentBrowser, changeCurrentBrowser}