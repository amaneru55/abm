import React, {ChangeEventHandler} from 'react'
import {Avatar, Button, Checkbox, Input, Spacer} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import IconBxLock from "@icons/BxLock.tsx";
import IconBxUser from "@icons/BxUser.tsx";
import IconBxKey from "@icons/BxKey.tsx";
import {useCurrentUser} from "@data/use-user.ts";
import * as EPaths from '@shared/enums/paths.ts'
import userAPI from "@apis/user.ts";

const FORM_ID = 'login-form'

const useLogin = () => {
  const navigate = useNavigate()
  const defaultRememberMe = localStorage.getItem('rememberMe') === 'true'
  const [loading, setLoading] = React.useState<boolean>(false)

  const {
    data: user,
    mutate: refreshCurrentUser
  } = useCurrentUser()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<User.Login.Form>()

  const handleRememberMeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target
    localStorage.setItem('rememberMe', checked.toString())
  }

  const handleLogin = handleSubmit(async (data) => {
    setLoading(true)
    const user = await userAPI.login(data)
    setLoading(false)
    if (!user?.token) return
    const rememberMe = localStorage.getItem('rememberMe') === 'true'

    if (rememberMe) {
      localStorage.setItem('token', user.token)
    } else {
      sessionStorage.setItem('token', user.token)
    }
    await refreshCurrentUser()
  })

  React.useEffect(
    () => {
      if (user) {
        navigate(EPaths.Primary.LAYOUT)
      }
    },
    [user, navigate]
  )

  return {
    loading,
    register,
    errors,
    defaultRememberMe,
    handleRememberMeChange,
    handleLogin,
  }
}

const Login: React.FC = () => {
  const {
    loading,
    register,
    errors,
    defaultRememberMe,
    handleRememberMeChange,
    handleLogin,
  } = useLogin()

  return (
    <form
      id={FORM_ID}
      className={'mx-auto max-w-[380px] flex flex-col items-center pt-40'}
      onSubmit={handleLogin}
    >
      <Avatar
        size={'md'}
        color={'secondary'}
        fallback={(
          <IconBxLock className={'text-large'} />
        )}
      />
      <Spacer y={1} />
      <h1 className={'text-2xl'}>登陆</h1>
      <Spacer y={5} />
      <Input
        autoFocus
        {...register('username', {
          required: '用户名不能为空',
        })}
        autoComplete={'username'}
        placeholder={'请输入用户名'}
        isInvalid={!!errors.username}
        errorMessage={errors.username?.message}
        startContent={(
          <IconBxUser className={'text-large text-default-500'} />
        )}
      />
      <Spacer y={5} />
      <Input
        type={'password'}
        {...register('password', {
          required: '密码不能为空',
        })}
        autoComplete={'password'}
        placeholder={'请输入密码'}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        startContent={(
          <IconBxKey className={'text-large text-default-500'} />
        )}
      />
      <Spacer y={2} />
      <div className={'w-full'}>
        <Checkbox defaultSelected={defaultRememberMe} onChange={handleRememberMeChange}>
          记住我
        </Checkbox>
      </div>
      <Spacer y={5} />
      <Button className={'w-full bg-primary'} type={'submit'} form={FORM_ID} isLoading={loading}>
        登陆
      </Button>
    </form>
  )
}

export default Login
