import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default function (idProfile: string) {
    axios.get(`${process.env.STOP_PROFILE_API_URL}${idProfile}`).then();
}