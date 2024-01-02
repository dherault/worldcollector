export type CollectionsType = 'users' | 'collectibles' | 'searchables'

export type User = {
  id: string
  name: string
  email: string
  hasSwearedOath: boolean
  createdAt: string
  updatedAt: string
}

export type Collectible = {
  id: string
  name: string
  description: string
  imageStoragePath: string
  status: 'pending' | 'approved' | 'rejected'
  ownerId: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type Searchable = {
  id: string
  type: 'user' | 'collectible'
  name: string
  description: string
  userId: string
  createdAt: string
  updatedAt: string
}
