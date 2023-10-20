import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { ref, uploadBytes } from 'firebase/storage'

import { Collectible, Searchable, User } from '~types'

import { authentication, db, storage } from '~firebase'

import fakeData from '~data/fake-data.json'

const N_USERS = 24
const N_COLLECTIBLES = 256
const USER_PASSWORD = '1234567890'
const IMAGE_URL = 'https://picsum.photos/400/300'
const createUserData = index => ({
  email: `user${index}@worldcollector.app`,
  name: `User ${index}`,
})

const users = []

async function createFakeData() {
  for (let i = 0; i < N_USERS; i++) {
    await createUser(i)
  }

  for (let i = 0; i < N_COLLECTIBLES; i++) {
    await createCollectible()
  }
}

async function createUser(index) {
  const { email, name } = createUserData(index)

  const userCredentials = await createUserWithEmailAndPassword(authentication, email, USER_PASSWORD)

  const id = userCredentials.user.uid
  const now = new Date().toISOString()
  const user: User = {
    id,
    name,
    email,
    createdAt: now,
    updatedAt: now,
  }

  await setDoc(doc(db, 'users', id), user)

  const searchable: Searchable = {
    id,
    type: 'user',
    name,
    description: '',
    userId: id,
    createdAt: now,
    updatedAt: now,
  }

  await setDoc(doc(db, 'searchables', id), searchable)

  users.push(user)

  console.log(`Created user ${name} with email ${email}`)
}

async function createCollectible() {
  const user = users[Math.random() * users.length | 0]

  const id = nanoid()
  const now = new Date().toISOString()

  const response = await fetch(IMAGE_URL)
  const blob = await response.blob()

  const result = await uploadBytes(ref(storage, `collectibles/${id}`), blob)

  const collectible: Collectible = {
    id,
    name: fakeData.names[Math.random() * fakeData.names.length | 0],
    description: fakeData.descriptions[Math.random() * fakeData.descriptions.length | 0],
    imageStoragePath: result.metadata.fullPath,
    status: 'pending',
    ownerId: user.id,
    userId: user.id,
    createdAt: now,
    updatedAt: now,
  }

  await setDoc(doc(db, 'collectibles', id), collectible)

  const searchable: Searchable = {
    id,
    type: 'collectible',
    name: collectible.name,
    description: collectible.description,
    userId: user.id,
    createdAt: now,
    updatedAt: now,
  }

  await setDoc(doc(db, 'searchables', id), searchable)

  console.log(`Created collectible ${collectible.name} with status ${collectible.status}`)
}

export default createFakeData
