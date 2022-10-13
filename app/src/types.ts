export type UserType = {
  id: string
  pseudonyme: string
  email: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export type ItemType = {
  id: string
  name: string
  description: string
  imageUrls: string[]
  verified: boolean
  ownerId: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type MarketplaceItemType = {
  id: string
  itemId: string
  userId: string
  price: number
  createdAt: string
  updatedAt: string
}
