import React from 'react'
import { useForm } from 'react-hook-form'
import FormItem from 'app/components/forms/FormItem'
import InputText from 'app/components/forms/InputText'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPasswordFormInput, UserPasswordFormInputType } from 'app/users/validations'

type UserPasswordFormProps = {
  onSubmit: (data: UserPasswordFormInputType) => void
}

const UserPasswordForm = (props: UserPasswordFormProps) => {
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: zodResolver(UserPasswordFormInput),
  })

  return (
    <form className="block" onSubmit={handleSubmit(props.onSubmit)}>
      <FormItem title="Password" className="mt-4 first:mt-0" error={errors?.password}>
        <InputText type="password" name="password" placeholder="" ref={register} defaultValue={''} />
      </FormItem>
      <FormItem title="Password Confirmation" className="mt-4 first:mt-0" error={errors?.passwordConfirmation}>
        <InputText type="password" name="passwordConfirmation" placeholder="" ref={register} defaultValue={''} />
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
