export type UserType = {
  id: string
  pseudonyme: string
  email: string
  imageUrl: string
  isAdministrator: boolean
  createdAt: string
  updatedAt: string
}

export type CollectibleType = {
  id: string
  name: string
  description: string
  imageStoragePaths: string[]
  verificationStatus: 'accepted' | 'rejected' | 'pending',
  verificationMessage: string
  ownerId: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type MarketplaceCollectibleType = {
  id: string
  collectibleId: string
  userId: string
  price: number
  createdAt: string
  updatedAt: string
}
