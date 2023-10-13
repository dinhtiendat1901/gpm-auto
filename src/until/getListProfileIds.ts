import dotenv from "dotenv";
import axios, {AxiosResponse} from "axios";

dotenv.config();

interface Profile {
    id: string,
    name: string,
    path: string,
    created_at: string
}

export default async function getListProfileIds(from: number, to: number) {
    const listProfiles = await axios.get<any, AxiosResponse<Profile[]>, any>(process.env.GET_LIST_PROFILES_API_URL);
    const sliceProfiles = listProfiles.data.reverse().slice(from - 1, to);
    const listProfileIds: string[] = [];
    sliceProfiles.forEach(value => {
        listProfileIds.push(value.id);
    })
    return listProfileIds;
}



