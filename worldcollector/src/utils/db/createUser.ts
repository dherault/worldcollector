import type { User } from '~types'

type CreateUserArg = Omit<
  User,
  | 'hasVerifiedEmail'
  | 'hasSentSignupMessages'
  | 'isAdministrator'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>

function createUser(user: CreateUserArg): User {
  const now = new Date().toISOString()

  return {
    ...user,
    hasVerifiedEmail: false,
    hasSentSignupMessages: false,
    isAdministrator: false,
    createdAt: now,
    updatedAt: now,
    deletedAt: '',
  }
}

export default createUser
