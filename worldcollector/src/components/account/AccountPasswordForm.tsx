import { useCallback, useState } from 'react'
import { updatePassword } from 'firebase/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { AUTHENTICATION_ERRORS, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '~constants'

import useUser from '~hooks/user/useUser'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~components/ui/Form'
import { Button } from '~components/ui/Button'
import { Input } from '~components/ui/Input'

const passwordsFormSchema = z.object({
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, `Your password must be at least ${MIN_PASSWORD_LENGTH} characters`)
    .max(MAX_PASSWORD_LENGTH, `Your password must be at most ${MAX_PASSWORD_LENGTH} characters`),
  passwordConfirmation: z
    .string()
    .min(MIN_PASSWORD_LENGTH, `Your password must be at least ${MIN_PASSWORD_LENGTH} characters`)
    .max(MAX_PASSWORD_LENGTH, `Your password must be at most ${MAX_PASSWORD_LENGTH} characters`),
})
.refine(data => data.password === data.passwordConfirmation, {
  message: 'Passwords don\'t match',
  path: ['passwordConfirmation'],
})

function AccountPasswordForm() {
  const { user, viewer } = useUser()
  const [success, setSuccess] = useState(false)
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const error = AUTHENTICATION_ERRORS[errorCode as keyof typeof AUTHENTICATION_ERRORS] ?? (errorCode ? AUTHENTICATION_ERRORS.default : null)

  const passwordForm = useForm<z.infer<typeof passwordsFormSchema>>({
    resolver: zodResolver(passwordsFormSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })

  const handlePasswordSubmit = useCallback(async (values: z.infer<typeof passwordsFormSchema>) => {
    if (loading) return
    if (!viewer) return

    setSuccess(false)
    setErrorCode(null)
    setLoading(true)

    try {
      await updatePassword(viewer, values.password)

      setSuccess(true)

      passwordForm.reset()
    }
    catch (error: any) {
      setErrorCode(error.code)
    }

    setLoading(false)
  }, [
    loading,
    viewer,
    passwordForm,
  ])

  if (!user) return null
  if (!user.signInProviders.includes('password')) return null

  return (
    <section>
      <h2 className="mb-2 font-bold">
        Change password
      </h2>
      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
          className="w-full md:w-fit space-y-2"
        >
          <FormField
            control={passwordForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  New password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="w-full md:w-auto md:min-w-[300px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  New password confirmation
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="off"
                    placeholder="••••••••"
                    className="w-full md:w-auto md:min-w-[300px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:flex items-center gap-2">
            <Button
              type="submit"
              loading={loading}
            >
              Save
            </Button>
            {success && (
              <div className="mt-2 md:mt-0 text-green-500 text-sm">
                Password changed successfully!
              </div>
            )}
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500">
              {error}
              {error === AUTHENTICATION_ERRORS.default && (
                <>
                  <br />
                  {errorCode}
                </>
              )}
            </p>
          )}
        </form>
      </Form>
    </section>
  )
}

export default AccountPasswordForm
