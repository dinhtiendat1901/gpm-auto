import puppeteer, {Browser} from "puppeteer";
import axios, {AxiosResponse} from "axios";
import dotenv from "dotenv";

dotenv.config();


interface dataFromStartProfile {
    selenium_remote_debug_address: string
}

interface dataFromGetBrowserConnectInfo {
    webSocketDebuggerUrl: string
}

export default async function (idProfile: string): Promise<Browser> {
    const responseStartProfile = await axios.get<any, AxiosResponse<dataFromStartProfile>, any>(`${process.env.START_PROFILE_API_URL}${idProfile}`);
    await new Promise(r => setTimeout(r, 2000));
    const responseGetBrowserConnectInfo = await axios.get<any, AxiosResponse<dataFromGetBrowserConnectInfo>, any>(`http://${responseStartProfile.data.selenium_remote_debug_address}/json/version`);
    return await puppeteer.connect({
        browserWSEndpoint: responseGetBrowserConnectInfo.data.webSocketDebuggerUrl,
        defaultViewport: null
    });
}