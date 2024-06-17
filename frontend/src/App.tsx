import { useState, createContext, Dispatch, SetStateAction } from 'react';
import UserForm from '@/components/form';

interface FormTypeContextType {
  formType: string | null;
  setFormType: Dispatch<SetStateAction<string | null>>;
}

export const FormTypeContext = createContext<FormTypeContextType | null>(null);

function App() {
  const [formType, setFormType] = useState<string | null>(null);
  console.log(String(import.meta.env.VITE_SERVER_LINK))
  return (
    <FormTypeContext.Provider value={{ formType, setFormType }}>
      <UserForm />
    </FormTypeContext.Provider>
  )
}

export default App;
