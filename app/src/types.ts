export type UserMetadataType = {
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
  ownerId: string,
  userId: string,
  createdAt: string
  updatedAt: string
}
