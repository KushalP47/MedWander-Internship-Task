import { z } from 'zod'
import { countryCodes } from './countryCodes'

export interface code {
    country: string,
    phone: string,
    phoneLength: number
}

export interface apiResponse {
  status: number,
  message: string,
}

export interface data {
    code: string,
    label: string,
    phone: string,
    phoneLength: number | number[],
    suggested?: boolean,
}

export const formSchema = z.object({
    name: z.string().regex(/^[A-Za-z]+$/i, "Only Alphabetic letters are allowed"),
    countryCode: z.string(),
    phoneNumber: z.string().regex(/^[0-9]+$/i, "Only numbers are allowed")
  }).refine(data => {
    const countryCode = data.countryCode
    console.log(data)
    console.log(countryCodes)
    const size = countryCodes.find(code => code.phone === countryCode) || { phoneLength: 0 }
    console.log(size)
    if (data.phoneNumber.length === size.phoneLength) {
      return true
    } else {
      console.log('Invalid phone number length')
      return false
    }
  },{message: `Invalid phone number length`, path: ['phoneNumber']})

export type FormValues = z.infer<typeof formSchema>;