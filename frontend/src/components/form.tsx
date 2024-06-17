import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormValues, formSchema } from '../lib/types';
import { countryCodes } from '../lib/countryCodes';
import { postData } from '../api/formApi';
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { FormTypeContext } from '../App';  // Importing the correct context
import { getExcelApi } from '@/api/getExcelApi';

function UserForm() {
  const context = useContext(FormTypeContext);
  if (!context) {
    throw new Error("UserForm must be used within a FormTypeContext.Provider");
  }

  const { formType, setFormType } = context;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      countryCode: '',
      phoneNumber: ''
    }
  });

  // Load default values based on formType
  const loadDefaultValues = () => {
    if(!formType) return;
    const defaultValues = localStorage.getItem(formType) ? JSON.parse(localStorage.getItem(formType) || '{}') : {};
    form.reset({
      name: defaultValues?.name || '',
      countryCode: defaultValues?.countryCode || '',
      phoneNumber: defaultValues?.phoneNumber || ''
    });
  };

  useEffect(() => {
    if (formType) {
      loadDefaultValues();
    }
  }, [formType]);

  if (!formType) {
    const handleUpdateData = async () => {
        try {
            const result = await getExcelApi();
            if (result.status === 200) {
            alert('Success');
            } else {
            alert('Failed: Server side error');
            }
        } catch (error) {
            alert('An unexpected error occurred');
        }
    }

    const handleExcel = async () => {
      window.open("https://docs.google.com/spreadsheets/d/1s-esBYzi5BOrA_wUzjHoVJv7tKPH1KA4s8bKKuzyJbY/edit?usp=sharing", "_blank");
    }

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <div className='p-4 rounded-lg justify-center items-center m-6'>
          <Card className="bg-white border-4 border-black w-full flex flex-row justify-center items-center p-6">
            <div className='w-1/2 h-full flex flex-col'>
              <div className='flex justify-center p-2'>
                <h1 className="text-5xl font-bold px-2">Welcome Wanderer</h1>
              </div>
              <div className='flex justify-center p-2'>
                <p className="font py-4 px-2">Dear wanderer, let's take a break and went off to see the magical world around us, let's explore, let's meet new people, make new friends. Oh! And in the meanwhile don't forget to take your friends details.....</p>
              </div>
              <div className='w-full h-full flex flex-row justify-center items-center '>
                <Button className="m-2 w-1/3 h-1/2 text-2xl text-black bg-white border-2 border-black hover:bg-black hover:text-white" 
                  onClick={() => setFormType('Form A')}>
                    Form A</Button>
                <Button className="m-2 w-1/3 h-1/2 text-2xl text-black bg-white border-2 border-black hover:bg-black hover:text-white" 
                onClick={() => setFormType('Form B')}>
                  Form B</Button>
              </div>
            </div>
            <div className='w-1/2 h-full flex justify-center items-center'>
              {/* <Card className=""> */}
                <img src='mountains.jpg' alt="Logo" className="shadow rounded-xl" />
              {/* </Card> */}
            </div>
          </Card>
        </div>
        <div className='p-4 rounded-lg justify-center items-center m-6'>
          <Card className="bg-white border-4 border-black w-full flex flex-row justify-center items-center p-6">
            <div className='w-1/2 h-full flex justify-center items-center'>
              {/* <Card className=""> */}
                <img src='city.jpeg' alt="Logo" className="shadow rounded-xl" />
              {/* </Card> */}
            </div>
            <div className='w-1/2 h-full flex flex-col p-2'>
              <div className='flex justify-center'>
                <h1 className="text-5xl font-bold px-2">Trip Summary</h1>
              </div>
              <div className='flex justify-center p-2'>
                <p className="font py-4 px-4">Dear wanderer, enough of visiting places time to go back to the same old city life, though you can see the information of all you friends that you have met along in the journey....</p>
              </div>
              <div className='w-full h-full flex flex-row justify-center items-center '>
                <Button className="m-2 w-1/3 h-1/2 text-2xl text-black bg-white border-4 border-green-700 hover:bg-green-700 hover:text-white" 
                  onClick={handleUpdateData}>
                    Update Data</Button>
                <Button className="m-2 w-1/3 h-1/2 text-2xl text-black bg-white border-4 border-blue-700 hover:bg-blue-700 hover:text-white" 
                onClick={handleExcel}>
                  Excel</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: FormValues) => {
    localStorage.setItem(formType, JSON.stringify(data));
    try {
      const result = await postData(data, formType);
      if (result.status === 200) {
        alert('Success');
        form.reset();
        setFormType(null);  // Reset form type after submission
      } else {
        alert('Failed: Server side error');
      }
    } catch (error) {
      alert('An unexpected error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center">
    <Card className="bg-white border-4 border-black w-1/2 p-6 my-10 flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle className='font-bold text-4xl'>{formType}</CardTitle>
      </CardHeader>
      {/* <CardContent> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center text-xl w-full space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className='w-3/4'>
                  <FormLabel className='text-2xl'>Name</FormLabel>
                  <FormControl>
                    <Input className="text-sm" placeholder="Name.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className='w-full flex flex-row'> */}
              {/* <div className="w-2/5"> */}
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem className='w-3/4'>
                      <FormLabel className="text-2xl">Country Code</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country Code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countryCodes.map((code) => (
                            <SelectItem key={code.phone} value={code.phone}>
                              {code.country} +{code.phone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              {/* </div> */}
              {/* <div className='w-3/5'> */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className='w-3/4'>
                      <FormLabel className="text-2xl">Phone Number</FormLabel>
                      <FormControl>
                        <Input className="text-sm" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              {/* </div> */}
            {/* </div> */}
            <Button className="size-auto text-center text-xl" type="submit">Submit</Button>
          </form>
        </Form>
      {/* </CardContent> */}
    </Card>
    </div>
  );
}

export default UserForm;
