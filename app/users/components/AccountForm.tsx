import React from 'react'
import { useForm } from 'react-hook-form'
import FormItem from 'app/components/forms/FormItem'
import InputText from 'app/components/forms/InputText'

export type AccountFormValues = {
  displayId: string
  email: string
  password?: string
  password_confirmation?: string
}

type AccountFormProps = {
  initialValues?: AccountFormValues & any
  onSubmit: (data: AccountFormValues) => void
}

const AccountForm = (props: AccountFormProps) => {
  const { register, handleSubmit, watch, errors } = useForm()

  return (
    <form className="block py-4" onSubmit={handleSubmit(props.onSubmit)}>
      <FormItem title="Display ID:" className="mt-4 first:mt-0">
        <InputText
          type="text"
          name="displayId"
          placeholder="your display id"
          ref={register}
          defaultValue={props.initialValues?.displayId}
        />
      </FormItem>
      <FormItem title="Email:" className="mt-4 first:mt-0">
        <InputText
          type="text"
          name="email"
          placeholder="example@example.com"
          ref={register}
          defaultValue={props.initialValues?.email}
        />
      </FormItem>
      <FormItem title="Password" className="mt-4 first:mt-0">
        <InputText type="password" name="password" placeholder="" ref={register} defaultValue={''} />
      </FormItem>
      <FormItem title="Password Confirmation" className="mt-4 first:mt-0">
        <InputText type="password" name="password_confirmation" placeholder="" ref={register} defaultValue={''} />
      </FormItem>

      <div className="mt-6 flex justify-center">
        <button className="border rounded-md py-2 px-4 focus:outline-none bg-teal-600 text-white font-bold">
          Submit!
        </button>
      </div>
    </form>
  )
}

export default AccountForm
