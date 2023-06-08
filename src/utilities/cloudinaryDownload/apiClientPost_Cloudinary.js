import axios from "axios";
import { baseURL } from "../api";

export default async function FileDownload(fileUrl, destinationPath) {
  try {
    const res = await axios.post(
      `${baseURL}/v1/docs/${fileUrl}`,
      destinationPath
    );
    return res
  } catch (err) {
    console.error(err);
  }
}
