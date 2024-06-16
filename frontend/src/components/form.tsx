import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
    formType: string
}

const formSchema = z.object({
    name: z.string().min(2).max(255),
    countryCode: z.string().length(2),
    phoneNumber: z.string().min(6),
})

function Form(props: Props) {
    const { formType } = props

    return (
        <h1>{formType}</h1>

    )
}

export default Form
