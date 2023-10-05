import axios, {AxiosResponse} from "axios";
import puppeteer, {Browser} from "puppeteer";
import * as robot from "robotjs";

const apiUrl = 'http://127.0.0.1:19995';


interface dataFromStartProfile {
    selenium_remote_debug_address: string
}

interface dataFromGetBrowserConnectInfo {
    webSocketDebuggerUrl: string
}

interface Profile {
    id: string,
    name: string,
    path: string,
    created_at: string
}

async function startProfile(idProfile: string): Promise<Browser> {
    const responseStartProfile = await axios.get<any, AxiosResponse<dataFromStartProfile>, any>(`${apiUrl}/v2/start?profile_id=${idProfile}`);
    await new Promise(r => setTimeout(r, 2000));
    const responseGetBrowserConnectInfo = await axios.get<any, AxiosResponse<dataFromGetBrowserConnectInfo>, any>(`http://${responseStartProfile.data.selenium_remote_debug_address}/json/version`);
    return await puppeteer.connect({
        browserWSEndpoint: responseGetBrowserConnectInfo.data.webSocketDebuggerUrl,
        defaultViewport: null
    });
}

function stopProfile(idProfile: string) {
    axios.get(`${apiUrl}/v2/stop?profile_id=${idProfile}`).then();
}


async function getListProfileIds(): Promise<string[]> {
    const listProfiles = await axios.get<any, AxiosResponse<Profile[]>, any>(`${apiUrl}/v2/profiles`);
    const listProfileIds: string[] = [];
    listProfiles.data.forEach(value => {
        listProfileIds.push(value.id);
    })
    return listProfileIds;
}


async function main() {
    const browser = await startProfile('ffe1cc2f-0feb-45d2-9156-d3b6dcea8494');
    const page = await browser.pages().then(allPages => allPages[0]);


    await page.goto('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-GB');
    await page.evaluate(() => {
        document.documentElement.requestFullscreen();
    });
    await page.waitForSelector('[aria-label="Add to Chrome"]');
    await page.click('[aria-label="Add to Chrome"]');


    robot.moveMouse(100, 100);
    robot.mouseClick();
    await new Promise(r => setTimeout(r, 2000));
    robot.keyTap('left');
    robot.keyTap('enter');
    const newWindowTarget = await browser.waitForTarget(
        target => target.url() === 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#onboarding/welcome', {
            timeout: 600000
        }
    );

    const metamaskPage = await newWindowTarget.page();
    await metamaskPage.waitForSelector('#onboarding__terms-checkbox', {visible: true});
    await new Promise(r => setTimeout(r, 1000));
    await metamaskPage.click('#onboarding__terms-checkbox');
    await metamaskPage.click('[data-testid="onboarding-create-wallet"]');
    await metamaskPage.waitForSelector('[data-testid="metametrics-i-agree"]');
    await metamaskPage.click('[data-testid="metametrics-i-agree"]');
    await metamaskPage.waitForSelector('[data-testid="create-password-new"]');
    await metamaskPage.type('[data-testid="create-password-new"]', 'Jav13579');
    await metamaskPage.type('[data-testid="create-password-confirm"]', 'Jav13579');
    await metamaskPage.click('[data-testid="create-password-terms"]');
    await metamaskPage.click('[data-testid="create-password-wallet"]');
    await metamaskPage.waitForSelector('[data-testid="secure-wallet-later"]');
    await metamaskPage.click('[data-testid="secure-wallet-later"]');
    await metamaskPage.waitForSelector('[data-testid="skip-srp-backup-popover-checkbox"]');
    await metamaskPage.click('[data-testid="skip-srp-backup-popover-checkbox"]');
    await metamaskPage.click('[data-testid="skip-srp-backup"]');
    await metamaskPage.waitForSelector('[data-testid="onboarding-complete-done"]');
    await metamaskPage.click('[data-testid="onboarding-complete-done"]');
    await metamaskPage.waitForSelector('[data-testid="pin-extension-next"]');
    await metamaskPage.click('[data-testid="pin-extension-next"]');
    await metamaskPage.waitForSelector('[data-testid="pin-extension-done"]');
    await metamaskPage.click('[data-testid="pin-extension-done"]');


    const alphaBotPage = await browser.newPage();
    await alphaBotPage.goto('https://www.alphabot.app/');
    await alphaBotPage.waitForSelector('[data-action="header-sign-in"]');
    await alphaBotPage.click('[data-action="header-sign-in"]');
    await alphaBotPage.waitForSelector('.css-1c7g2xp');
    await alphaBotPage.click('.css-1c7g2xp');
    const backgroundPageTarget = await browser.waitForTarget(
        target => target.url() === 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/notification.html', {timeout: 30000}
    );
    const backgroundPage = await backgroundPageTarget.page();
    await backgroundPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
    await backgroundPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
    await backgroundPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');

}


main().then();


