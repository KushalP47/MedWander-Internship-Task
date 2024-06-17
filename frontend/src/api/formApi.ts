import { FormValues } from '../lib/types'
import axios from 'axios';

export const postData = async (data: FormValues, formType: string) => {
    const reqBody = {
        formType,
        name: data.name,
        countryCode: data.countryCode,
        phoneNumber: data.phoneNumber
    }
    const response = await axios.post('http://localhost:3000/api/v1/postData', reqBody)
    return response
}