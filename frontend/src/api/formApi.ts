import { FormValues } from '../lib/types'

export const postData = async (data: FormValues, formType: string) => {
    const reqBody = {
        formType,
        data
    }
    const response = await fetch('http://localhost:3001/api/form', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    });
    return response.json();
}