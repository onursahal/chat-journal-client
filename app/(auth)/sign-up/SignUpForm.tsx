'use client'

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
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { signUpSchema } from '../../../src/definitions/auth'
import { signUpAction } from '../../../src/graphql/actions/auth.action'

export const SignUpForm = () => {
  const router = useRouter()
  const [isLoading, startTransition] = useTransition()
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpSchema),
  })

  const handleSignUp = () => {
    startTransition(async () => {
      const { data, error } = await signUpAction(
        form.getValues().firstName,
        form.getValues().lastName,
        form.getValues().email,
        form.getValues().password
      )
      console.log({ data, error })
    })
  }

  return (
    <div className="bg-card rounded-md px-4 py-8">
      <Form {...form}>
        <form
          className="flex flex-col gap-4 w-[300px] items-center"
          onSubmit={form.handleSubmit(handleSignUp)}
        >
          <FormField
            name="firstName"
            render={({ field }) => (
              <FormItem className="text-primary-foreground flex flex-col w-full">
                <FormLabel className="text-primary-foreground">
                  First name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-primary-foreground text-primary-foreground"
                    placeholder="Enter your first name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            render={({ field }) => (
              <FormItem className="text-primary-foreground flex flex-col w-full">
                <FormLabel className="text-primary-foreground">
                  First name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-primary-foreground text-primary-foreground"
                    placeholder="Enter your last name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="text-primary-foreground flex flex-col w-full">
                <FormLabel className="text-primary-foreground">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-primary-foreground text-primary-foreground"
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
              <FormItem className="text-primary-foreground flex flex-col w-full">
                <FormLabel className="text-primary-foreground">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-primary-foreground text-primary-foreground"
                    placeholder="Enter your password"
                    type="password"
                    onTouchEnd={() =>
                      !!form.getValues().confirmPassword &&
                      form.trigger('confirmPassword')
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="text-primary-foreground flex flex-col w-full">
                <FormLabel className="text-primary-foreground">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-primary-foreground text-primary-foreground"
                    placeholder="Confirm your password"
                    type="password"
                    onTouchEnd={() => form.trigger('confirmPassword')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Checkbox id="agreements" className="border-primary-foreground" />
            <Label
              htmlFor="agreements"
              className="text-primary-foreground text-xs"
            >
              I agree to all the Terms, Conditions and Privacy Policy
            </Label>
          </div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
          <Label htmlFor="sign-up" className="text-primary-foreground text-xs">
            Already have an account ?{' '}
            <Button
              id="sign-up"
              variant="link"
              className="text-primary-foreground text-xs pl-0"
              type="button"
              onClick={() => router.push('/sign-in')}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Sign In'
              )}
            </Button>
          </Label>
        </form>
      </Form>
    </div>
  )
}
