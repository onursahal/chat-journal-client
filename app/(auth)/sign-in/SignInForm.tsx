'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signInAction } from '../../../src/graphql/actions/auth.action'
import { signInSchema } from '@/src/definitions/auth'

export const SignInForm = () => {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  })
  const [isLoading, startTransition] = useTransition()

  const handleLogin = async (inputs: {
    email: string | null
    password: string | null
  }) => {
    startTransition(async () => {
      const email = inputs.email || ''
      const password = inputs.password || ''
      const { data, errorMessage } = await signInAction(email, password)
      console.log({ data, errorMessage })
    })
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col gap-4 w-[300px] items-center"
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="text-white flex flex-col w-full">
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="text-white"
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem className="text-white flex flex-col w-full">
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="text-white"
                    placeholder="Enter your email"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-2">
              <Checkbox id="remember-me" className="border-white" />
              <Label htmlFor="remember-me" className="text-white text-xs">
                Remember me
              </Label>
            </div>
            <Button
              variant="link"
              className="text-white text-xs self-end"
              type="button"
              onClick={() => console.log('redirect to forgot password')}
            >
              Forgot Password ?
            </Button>
          </div>
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="animate-spin" />}Sign In
          </Button>
          <Label htmlFor="sign-up" className="text-white text-xs">
            Don&apos;t have an account ?{' '}
            <Button
              id="sign-up"
              variant="link"
              className="text-white text-xs pl-0"
              type="button"
              onClick={() => router.push('/sign-up')}
            >
              Sign Up
            </Button>
          </Label>
        </form>
      </Form>
    </>
  )
}
