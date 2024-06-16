import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormValues, formSchema  } from '../lib/types'
import { countryCodes } from '../lib/countryCodes'
import { postData } from '../api/formApi'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface Props {
    formType: string
}

function UserForm(props: Props) {
    const { formType } = props
    const defaultValues = localStorage.getItem(formType) ? JSON.parse(localStorage.getItem(formType) || '{}') : null

    const form = useForm<FormValues>(
        {
          resolver: zodResolver(formSchema),
          defaultValues: {
            name: defaultValues?.name || '',
            countryCode: defaultValues?.countryCode || '',
            phoneNumber: defaultValues?.phoneNumber || ''
          }
        }
      );

    const onSubmit = async(data: FormValues) => {
        localStorage.setItem(formType, JSON.stringify(data))
        const result = await postData(data, formType)
        console.log(result)
        if(result.status === 200) {
          alert('Success')
          form.reset()
        } else {
          alert('Failed: Server side error')
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
                                        <SelectItem value={code.phone}>
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
      )
}

export default UserForm
