import axios from 'axios';

export async function getExcelApi() {
    const url = `${import.meta.env.VITE_SERVER_LINK}/api/v1/excel`
    const response = await axios.get(url)
    console.log(response)
    return response;
}
