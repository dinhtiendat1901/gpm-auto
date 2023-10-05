import axios, {AxiosResponse} from "axios";


const apiUrl = 'http://127.0.0.1:19995';

interface Profile {
    id: string,
    name: string,
    path: string,
    created_at: string
}

export default async function getListProfileIds(): Promise<string[]> {
    const listProfiles = await axios.get<any, AxiosResponse<Profile[]>, any>(`${apiUrl}/v2/profiles`);
    const listProfileIds: string[] = [];
    listProfiles.data.forEach(value => {
        listProfileIds.push(value.id);
    })
    return listProfileIds;
}