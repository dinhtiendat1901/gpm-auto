import {currentBrowser} from "../../globalVariable";
import {Job} from "bullmq";
import {writeToSecondSheet} from "../../until/excelUntil";

export default async function addSocialSubberJob(job: Job) {
    try {
        const subberPage = await currentBrowser.newPage();
        subberPage.setDefaultTimeout(15000);
        await subberPage.goto(process.env.SUBBER_URL, {waitUntil: 'networkidle0'});
        await subberPage.waitForSelector('.css-ul1ru9');
        await subberPage.click('.css-ul1ru9');

        await subberPage.waitForNavigation({waitUntil: 'networkidle0'});
        await subberPage.waitForSelector('#allow');
        await subberPage.click('#allow');

        await subberPage.waitForNavigation({waitUntil: 'networkidle0'});
        await subberPage.waitForSelector('.css-13qhihy');
        await subberPage.click('.css-13qhihy');

        await subberPage.waitForNavigation({waitUntil: 'networkidle0'});
        await subberPage.waitForSelector('button.button-ejjZWC.lookFilled-1H2Jvj.colorBrand-2M3O3N.sizeMedium-2oH5mg.grow-2T4nbg');
        await subberPage.click('button.button-ejjZWC.lookFilled-1H2Jvj.colorBrand-2M3O3N.sizeMedium-2oH5mg.grow-2T4nbg');
        await subberPage.waitForNavigation({waitUntil: 'networkidle0'});
    } catch (e) {
        await writeToSecondSheet(job.data.jobIndex, 'addSocialSubberJob');
    }
}