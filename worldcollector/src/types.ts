export type User = {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export enum CollectibleStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export type Collectible = {
  id: string
  name: string
  description: string
  imageStoragePath: string
  status: CollectibleStatus
  ownerId: string
  userId: string
  createdAt: string
  updatedAt: string
}
