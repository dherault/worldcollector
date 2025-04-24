import { createContext } from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

export default createContext<FormFieldContextValue>({} as FormFieldContextValue)
