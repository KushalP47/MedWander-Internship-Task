import axios from 'axios';

export async function getExcelApi() {
    const response = await axios.get('http://localhost:3000/api/v1/excel')
    console.log(response)
    return response;
}
