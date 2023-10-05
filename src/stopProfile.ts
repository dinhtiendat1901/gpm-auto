import axios from "axios";

const apiUrl = 'http://127.0.0.1:19995';
export default function (idProfile: string) {
    axios.get(`${apiUrl}/v2/stop?profile_id=${idProfile}`).then();
}