import './App.css'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { countryCodes } from './lib/countryCodes'

const formSchema = z.object({
  name: z.string().regex(/^[A-Za-z]+$/i, "Only Alphabetic letters are allowed"),
  country: z.string(),
  countryCode: z.string(),
  phoneNumber: z.string().regex(/^[0-9]+$/i, "Only numbers are allowed")
}).refine(data => {
  const countryCode = data.countryCode
  // console.log(countryCodes)
  const size = countryCodes.find(code => code.phone === countryCode) || { phoneLength: 0 }
  console.log(size)
  if (data.phoneNumber.length === size.phoneLength) {
    return true
  } else {
    console.log('Invalid phone number length')
    return false
  }
},{message: `Invalid phone number length`, path: ['phoneNumber']})

type FormValues = z.infer<typeof formSchema>;

function App() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormValues>(
    {
      resolver: zodResolver(formSchema),
    }
  );
  const getCountryCode = (country: string) => {
    const code = countryCodes.find(code => code.phone === country) || { phone: '' }
    return code.phone
  }
  const onSubmit = (data: FormValues) => console.log(data);
  return (
    <div className="">
    <div className="h-50% border-4 border-blue-600 text-3xl">
      <h1>Form</h1>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col border-4 border-red-700 p-4 mt-4'>

      <label htmlFor="name" className='items-begin text-2xl'>Name</label>
      <input {...register("name")}
      type="text"
      placeholder='Enter name' 
      className='px-4 py-2 rounded border-2 border-pink-700 mb-4'/>
      {errors.name && typeof errors.name.message === 'string' && <p>{errors.name.message}</p>}

      <div className='flex flex-row w-full'>
        {/* <label htmlFor="countryCode" className='text-2xl'>Country Code</label> */}

        <select id="country" {...register("country")} className='w-1/12 px-4 py-2 rounded border-2 border-pink-700 mb-4'>
          {countryCodes.map((code) => (<option value={code.phone}>{code.country}</option>))}
        </select>
        {errors.country && typeof errors.country.message === 'string' && <p>{errors.country.message}</p>}

        {/* <label htmlFor="phoneNumber" className='text-2xl'>Phone Number</label> */}
        <input  {...register("countryCode")} value={getCountryCode(getValues("country"))}
        className='w-1/6 px-4 py-2 rounded border-2 border-pink-700 mb-4'/>

        <input {...register("phoneNumber")}
        type="text"
        placeholder='Enter phone number'
        className='w-3/4 px-4 py-2 rounded border-2 border-pink-700 mb-4'
        />

      </div>
      {errors.phoneNumber && typeof errors.phoneNumber.message === 'string' && <p>{errors.phoneNumber.message}</p>}
      <button type="submit" className='bg-green-800 text-white text-lg justify-content items-center'>Submit</button>
    </form>
    </div>
  )
}

export default App
