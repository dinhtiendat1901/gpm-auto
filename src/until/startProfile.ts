import puppeteer, {Browser} from "puppeteer";
import axios, {AxiosResponse} from "axios";


const apiUrl = 'http://127.0.0.1:19995';

interface dataFromStartProfile {
    selenium_remote_debug_address: string
}

interface dataFromGetBrowserConnectInfo {
    webSocketDebuggerUrl: string
}

export default async function (idProfile: string): Promise<Browser> {
    const responseStartProfile = await axios.get<any, AxiosResponse<dataFromStartProfile>, any>(`${apiUrl}/v2/start?profile_id=${idProfile}`);
    await new Promise(r => setTimeout(r, 2000));
    const responseGetBrowserConnectInfo = await axios.get<any, AxiosResponse<dataFromGetBrowserConnectInfo>, any>(`http://${responseStartProfile.data.selenium_remote_debug_address}/json/version`);
    return await puppeteer.connect({
        browserWSEndpoint: responseGetBrowserConnectInfo.data.webSocketDebuggerUrl,
        defaultViewport: null
    });
}