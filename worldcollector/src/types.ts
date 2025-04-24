/* ---
  Database resources
--- */

export type DatabaseResource<T = unknown> = T & {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type User = DatabaseResource<{
  isAdministrator: boolean
  email: string
  name: string
  imageUrl: string
  signInProviders: SignInProvider[]
  hasVerifiedEmail: boolean
  hasSentSignupMessages: boolean
}>

/* ---
  Authentication
--- */

export type SignInProvider = 'password' | 'google.com'
