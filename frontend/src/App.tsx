import { useState } from 'react'
import UserForm from './components/form'

function App() {
  const [formType, setFormType] = useState('Home')
  const handleFormType = (formType: string) => {
    setFormType(formType)
  }
  return (
    <div>
      <button onClick={() => handleFormType('Form A')}>Form A</button>
      <button onClick={() => handleFormType('Form B')}>Form B</button>
      <FormSelector formType={formType} />
    </div>
  )
  return (
    (formType == "Form A" && <UserForm formType="Form A" />)
    (formType == "Form B" && <UserForm formType="Form B" />)
  )
}

export default App
