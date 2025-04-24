import { useCallback, useState } from 'react'
import { Link } from 'react-router'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Eye, EyeClosed } from 'lucide-react'

import { type SignInProvider, type User } from '~types'

import {
  AUTHENTICATION_ERRORS,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '~constants'

import { authentication, database, googleProvider } from '~firebase'

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
import { Label } from '~components/ui/Label'
import Divider from '~components/common/Divider'
import SocialButton from '~components/authentication/SocialButton'

const MODES = {
  START: 0,
  LOGIN: 1,
  SIGNUP: 2,
}

const emailFormSchema = z.object({
  email: z
    .string()
    .min(1, 'You must input an email')
    .email('Please enter a valid email')
    .trim()
    .toLowerCase(),
})

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

const passwordFormSchema = z.object({
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, `Your password must be at least ${MIN_PASSWORD_LENGTH} characters`)
    .max(MAX_PASSWORD_LENGTH, `Your password must be at most ${MAX_PASSWORD_LENGTH} characters`),
})

function Authentication() {
  const [mode, setMode] = useState(MODES.START)
  const [loading, setLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [providers, setProviders] = useState<SignInProvider[]>([])
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const error = AUTHENTICATION_ERRORS[errorCode as keyof typeof AUTHENTICATION_ERRORS] ?? (errorCode ? AUTHENTICATION_ERRORS.default : null)

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const passwordsForm = useForm<z.infer<typeof passwordsFormSchema>>({
    resolver: zodResolver(passwordsFormSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: '',
    },
  })

  const handleEmailSubmit = useCallback(async (values: z.infer<typeof emailFormSchema>) => {
    if (loading) return

    setErrorCode(null)
    setLoading(true)
    setProviders([])

    const data = await getDocs(query(
      collection(database, 'users'),
      where('email', '==', values.email),
      limit(1)
    ))

    setLoading(false)

    if (data.empty) {
      setMode(MODES.SIGNUP)

      return
    }

    const user = data.docs[0].data() as User

    setProviders(user.signInProviders)
    setMode(MODES.LOGIN)
  }, [
    loading,
  ])

  const handleSignupSubmit = useCallback(async (values: z.infer<typeof passwordsFormSchema>) => {
    if (loading) return

    setErrorCode(null)
    setLoading(true)

    const email = emailForm.getValues().email.trim().toLowerCase()

    try {
      await createUserWithEmailAndPassword(authentication, email, values.password)
    }
    catch (error: any) {
      setLoading(false)
      setErrorCode(error.code)
    }
  }, [
    loading,
    emailForm,
  ])

  const handleLoginSubmit = useCallback(async (values: z.infer<typeof passwordFormSchema>) => {
    if (loading) return

    setErrorCode(null)
    setLoading(true)

    const email = emailForm.getValues().email.trim().toLowerCase()

    try {
      await signInWithEmailAndPassword(authentication, email, values.password)
    }
    catch (error: any) {
      setLoading(false)
      setErrorCode(error.code)
    }
  }, [
    loading,
    emailForm,
  ])

  const handleBack = useCallback(() => {
    setMode(MODES.START)
    setProviders([])
  }, [])

  return (
    <>
      {mode === MODES.LOGIN && providers.includes('google.com') && (
        <>
          <Label className="mt-8 block text-center">
            Hi
            {' '}
            {emailForm.getValues().email}
          </Label>
          <Label className="mt-2 mb-4 block text-center">
            Use your Google account to continue
          </Label>
        </>
      )}
      {(mode === MODES.START || providers.includes('google.com')) && (
        <SocialButton
          firebaseAuthProvider={googleProvider}
          logoSrc="/images/google-logo.png"
          className="mt-2"
        >
          Continue with Google
        </SocialButton>
      )}
      {mode === MODES.START && (
        <Divider className="mt-6 mb-0.5">
          or
        </Divider>
      )}
      {mode === MODES.START && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
            className="space-y-4"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
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
              Continue
            </Button>
          </form>
        </Form>
      )}
      {mode === MODES.SIGNUP && (
        <>
          <div className="mt-8 text-center">
            Signin up as
          </div>
          <div className="mb-4 text-center">
            {emailForm.getValues().email}
          </div>
          <Form {...passwordsForm}>
            <form
              onSubmit={passwordsForm.handleSubmit(handleSignupSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordsForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          autoFocus
                          type={isPasswordVisible ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          className="pr-10"
                          {...field}
                        />
                        <div
                          className="py-3 px-4 absolute top-0 right-0 cursor-pointer"
                          onClick={() => setIsPasswordVisible(x => !x)}
                        >
                          {isPasswordVisible ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordsForm.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password confirmation
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pr-10"
                          {...field}
                        />
                        <div
                          className="py-3 px-4 absolute top-0 right-0 cursor-pointer"
                          onClick={() => setIsPasswordVisible(x => !x)}
                        >
                          {isPasswordVisible ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
                        </div>
                      </div>
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
                Sign up
              </Button>
            </form>
          </Form>
        </>
      )}
      {mode === MODES.LOGIN && providers.includes('password') && (
        <>
          <div className="mt-[60px] text-center">
            Login in as
          </div>
          <div className="mb-4 text-center">
            {emailForm.getValues().email}
          </div>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(handleLoginSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          autoFocus
                          type={isPasswordVisible ? 'text' : 'password'}
                          autoComplete="current-password"
                          placeholder="••••••••"
                          className="pr-10"
                          {...field}
                        />
                        <div
                          className="py-3 px-4 absolute top-0 right-0 cursor-pointer"
                          onClick={() => setIsPasswordVisible(x => !x)}
                        >
                          {isPasswordVisible ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
                        </div>
                      </div>
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
                Log in
              </Button>
            </form>
          </Form>
        </>
      )}
      {!!error && (
        <div className="mt-2 text-sm text-red-500">
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
        {mode !== MODES.START && (
          <div
            className="text-sm font-light text-neutral-500 dark:text-neutral-400 hover:underline cursor-pointer"
            onClick={handleBack}
          >
            Back
          </div>
        )}
        {mode === MODES.LOGIN && providers.includes('password') && (
          <div className="text-sm font-light text-neutral-500 dark:text-neutral-400">
            Forgot your password?
            {' '}
            <Link
              to="/authentication/password-reset"
              className="hover:underline"
            >
              Reset it
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Authentication
