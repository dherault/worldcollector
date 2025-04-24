import { useCallback, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from '~constants'

import useUser from '~hooks/user/useUser'
import { useToast } from '~hooks/ui/useToast'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~components/ui/Form'
import { Button } from '~components/ui/Button'
import { Input } from '~components/ui/Input'

const nameFormSchema = z.object({
  name: z
    .string()
    .min(MIN_NAME_LENGTH, `Your name must be at least ${MIN_NAME_LENGTH} characters`)
    .max(MAX_NAME_LENGTH, `Your name must be at most ${MAX_NAME_LENGTH} characters`),
})

function AccountNameForm() {
  const { user, updateUser } = useUser()
  const { toast } = useToast()

  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const nameForm = useForm<z.infer<typeof nameFormSchema>>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: {
      name: user?.name ?? '',
    },
  })

  const name = nameForm.watch('name')

  const handleNameSubmit = useCallback(async (values: z.infer<typeof nameFormSchema>) => {
    if (loading) return

    setSuccess(false)
    setLoading(true)

    try {
      await updateUser({ name: values.name })

      setSuccess(true)
    }
    catch (error: any) {
      toast({
        title: 'An errror occurred',
        description: error.message,
      })
    }

    setLoading(false)
  }, [
    loading,
    updateUser,
    toast,
  ])

  useEffect(() => {
    setSuccess(false)
  }, [
    name,
  ])

  if (!user) return null

  return (
    <section>
      <h2 className="mb-2 font-bold">
        Name
      </h2>
      <Form {...nameForm}>
        <form
          onSubmit={nameForm.handleSubmit(handleNameSubmit)}
          className="md:flex items-start gap-2 w-full md:w-fit"
        >
          <FormField
            control={nameForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete="name"
                    placeholder="Luke Skywalker"
                    className="w-full md:w-auto md:min-w-[300px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2 md:mt-0 md:flex items-center gap-2">
            <Button
              type="submit"
              loading={loading}
            >
              Save
            </Button>
            {success && (
              <div className="mt-2 md:mt-0 text-green-500 text-sm">
                Name changed successfully!
              </div>
            )}
          </div>
        </form>
      </Form>
    </section>
  )
}

export default AccountNameForm
