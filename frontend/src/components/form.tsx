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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

    return (
      <div>
        <Button onClick={() => setFormType('Form A')}>Form A</Button>
        <Button onClick={() => setFormType('Form B')}>Form B</Button>
        <Button onClick={handleUpdateData}>Update Data</Button>
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name.." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='w-full flex flex-row'>
          <div className="w-1/5">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Code</FormLabel>
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
                </FormItem>
              )}
            />
          </div>
          <div className='w-4/5'>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default UserForm;
