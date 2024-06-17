import { FormValues } from '../lib/types'
import axios from 'axios';

export const postData = async (data: FormValues, formType: string) => {
    const reqBody = {
        formType,
        name: data.name,
        countryCode: data.countryCode,
        phoneNumber: data.phoneNumber
    }
    console.log(import.meta.env.VITE_SERVER_LINK)
    const url = `${import.meta.env.VITE_SERVER_LINK}/api/v1/postData`
    const response = await axios.post(url, reqBody)
    return response
}