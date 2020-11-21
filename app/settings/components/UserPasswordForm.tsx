import React from 'react'
import { useForm } from 'react-hook-form'
import FormItem from 'app/components/forms/FormItem'
import InputText from 'app/components/forms/InputText'

export type UserPasswordFormValues = {
  password: string
  password_confirmation: string
}

type UserPasswordFormProps = {
  initialValues?: UserPasswordFormValues & any
  onSubmit: (data: UserPasswordFormValues) => void
}

const UserPasswordForm = (props: UserPasswordFormProps) => {
  const { register, handleSubmit, watch, errors } = useForm()

  return (
    <form className="block" onSubmit={handleSubmit(props.onSubmit)}>
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

export default UserPasswordForm
