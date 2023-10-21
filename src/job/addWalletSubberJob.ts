import {currentBrowser} from "../globalVariable";

export default async function () {
    const subberPage = await currentBrowser.newPage();
    subberPage.setDefaultTimeout(15000);
    await subberPage.goto(process.env.SUBBER_URL, {waitUntil: 'networkidle0'});
    const closeWindowButton = await subberPage.$('.dim.css-1h4ru7b');
    if (closeWindowButton) {
        await subberPage.click('.dim.css-1h4ru7b');
    }
    await subberPage.waitForSelector('.css-1m5tmdf', {visible: true});
    await subberPage.click('.css-1m5tmdf');
    await subberPage.waitForSelector('.css-r2vxgp', {visible: true});
    const listButtonLogin = await subberPage.$$('.css-r2vxgp');
    await listButtonLogin[0].click();
    await subberPage.waitForSelector('.iekbcc0.iekbcc9.ju367v84.ju367v6d.ju367v6y.ju367v7j.ju367vo.ju367vt.ju367vv.ju367v8o.ju367v99.ju367vav.g5kl0l0._12cbo8i3.ju367v8m._12cbo8i6', {visible: true});
    const listButtonWallet = await subberPage.$$('.iekbcc0.iekbcc9.ju367v84.ju367v6d.ju367v6y.ju367v7j.ju367vo.ju367vt.ju367vv.ju367v8o.ju367v99.ju367vav.g5kl0l0._12cbo8i3.ju367v8m._12cbo8i6');
    await listButtonWallet[0].click();


    const backgroundPageTarget = await currentBrowser.waitForTarget(
        target => target.url() === process.env.METAMASK_NOTIFICATION_URL);
    const backgroundPage = await backgroundPageTarget.page();
    backgroundPage.setDefaultTimeout(15000);
    await backgroundPage.waitForSelector('[data-testid="page-container-footer-next"]', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');
    await backgroundPage.waitForSelector('.permission-approval-container__content__requested', {visible: true});
    await backgroundPage.click('[data-testid="page-container-footer-next"]');


    const backgroundPageTarget1 = await currentBrowser.waitForTarget(
        target => target.url().includes('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/notification.html#confirm-transaction/') || target.url() === process.env.METAMASK_NOTIFICATION_URL);

    const lastPage = await backgroundPageTarget1.page();
    await lastPage.waitForSelector('.request-signature__origin', {visible: true});
    await lastPage.click('[data-testid="page-container-footer-next"]');


}