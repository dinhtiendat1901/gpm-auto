import {Browser} from "puppeteer";

let currentProfileId = '';
let currentBrowser: Browser = null;

function changeCurrentProfileId(profileId: string) {
    currentProfileId = profileId
}


export {currentBrowser, currentProfileId, changeCurrentProfileId}