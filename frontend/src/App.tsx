import './App.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { countryCodes } from './lib/countryCodes'
import { formSchema, FormValues } from './lib/types'

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>(
    {
      resolver: zodResolver(formSchema),
    }
  );
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
        <select id="code" {...register("countryCode")} className='w-1/5 px-4 py-2 rounded border-2 border-pink-700 mb-4 items-center justify-center'>
          {countryCodes.map((code) => (<option value={code.phone}>{code.country} +{code.phone}</option>))}
        </select>
        {errors.countryCode && typeof errors.countryCode.message === 'string' && <p>{errors.countryCode.message}</p>}
        {/* <label htmlFor="phoneNumber" className='text-2xl'>Phone Number</label> */}
        <input {...register("phoneNumber")}
        type="text"
        placeholder='Enter phone number'
        className='w-4/5 px-4 py-2 rounded border-2 border-pink-700 mb-4'
        />
      </div>
      {errors.phoneNumber && typeof errors.phoneNumber.message === 'string' && <p>{errors.phoneNumber.message}</p>}
      <button type="submit" className='bg-green-800 text-white text-lg hover:bg-black justify-content items-center'>Submit</button>
    </form>
    </div>
  )
}

export default App
