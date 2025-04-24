import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { sendPasswordResetEmail } from 'firebase/auth'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AUTHENTICATION_ERRORS } from '~constants'

import { authentication, logAnalytics } from '~firebase'

import { Button } from '~components/ui/Button'
import { Input } from '~components/ui/Input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~components/ui/Form'

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'You must input an email')
    .email('Please enter a valid email')
    .trim()
    .toLowerCase(),
})

function AuthenticationPasswordReset() {
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const error = AUTHENTICATION_ERRORS[errorCode as keyof typeof AUTHENTICATION_ERRORS] ?? (errorCode ? AUTHENTICATION_ERRORS.default : null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    if (loading) return

    setErrorCode(null)
    setLoading(true)

    const normalizedEmail = values.email.trim().toLowerCase()

    sendPasswordResetEmail(authentication, normalizedEmail)
      .then(() => {
        logAnalytics('reset_password')

        navigate('/authentication?password-reset=true')
      })
      .catch(error => {
        console.error('error while sendPasswordResetEmail', error)
        setLoading(false)
        setErrorCode(error.code)
      })
  }, [loading, navigate])

  return (
    <>
      <h2 className="text-lg md:text-3xl font-semibold leading-none text-center text-balance">
        Receive a password reset email
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-5 space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@company.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Send
          </Button>
        </form>
      </Form>
      {!!error && (
        <div className="mt-2 -mb-2 text-sm text-red-500 text-center">
          {error}
          {error === AUTHENTICATION_ERRORS.default && (
            <>
              <br />
              {errorCode}
            </>
          )}
        </div>
      )}
      <div className="mt-4 flex justify-between gap-4">
        <Link
          to="/authentication"
          className="text-sm font-light text-neutral-500 dark:text-neutral-400 hover:underline cursor-pointer"
        >
          Back
        </Link>
        <div className="text-sm font-light text-center text-neutral-500 dark:text-neutral-400">
          Remember your password?
          {' '}
          <Link
            to="/authentication"
            className="hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </>
  )
}

export default AuthenticationPasswordReset
