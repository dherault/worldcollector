import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Div, H1 } from 'honorable'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

import { ItemType, UserType } from '../types'
import { db } from '../firebase'

import FullScreenSpinner from '../components/FullScreenSpinner'

function Portfolio() {
  const { id = '' } = useParams()
  const [user, setUser] = useState<UserType | null>(null)
  const [items, setItems] = useState<ItemType[]>([])

  const fetchUser = useCallback(async () => {
    const querySnapshot = await getDoc(doc(db, 'users', id))

    setUser(querySnapshot.data() as UserType)
  }, [id])

  const fetchItems = useCallback(async () => {
    const q = query(collection(db, 'items'), where('ownerId', '==', id))
    const querySnapshot = await getDocs(q)

    const users: ItemType[] = []

    querySnapshot.forEach(doc => {
      users.push(doc.data() as ItemType)
    })

    setItems(users)
  }, [id])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  if (!user) {
    return (
      <FullScreenSpinner />
    )
  }

  return (
    <>
      <H1>{user.pseudonyme}</H1>
      <Div>
        {items.map(item => (
          <Div
            mr={1}
            mb={1}
            key={item.id}
          >
            <Link to={`/${item.id}`}>
              {item.name}
            </Link>
          </Div>
        ))}
      </Div>
    </>
  )
}

export default Portfolio
