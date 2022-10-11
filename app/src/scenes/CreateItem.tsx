import { FormEvent, useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, H1, Input } from 'honorable'
import { nanoid } from 'nanoid'
import { doc, setDoc } from 'firebase/firestore'

import ViewerContext from '../contexts/ViewerContext'

import { ItemType } from '../types'
import { db } from '../firebase'

function CreateItem() {
  const { viewer } = useContext(ViewerContext)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if (!viewer || loading) return

    const formatedName = name.trim()

    if (!formatedName) return

    setLoading(true)

    try {
      const id = nanoid()
      const now = new Date().toISOString()
      const item: ItemType = {
        id,
        name: formatedName,
        ownerId: viewer.id,
        userId: viewer.id,
        createdAt: now,
        updatedAt: now,
      }

      await setDoc(doc(db, 'items', id), item)

      navigate(`/~/${id}`)
    }
    catch (error) {
      console.error(error)

      setLoading(false)
      alert('An error occurred while creating the item.')
    }
  }, [viewer, loading, name, navigate])

  return (
    <>
      <H1>Collect anything</H1>
      <Form onSubmit={handleSubmit}>
        <Input
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="name"
        />
        <Button
          type="submit"
          loading={loading}
          onClick={handleSubmit}
        >
          Create collectible
        </Button>
      </Form>
    </>
  )
}

export default CreateItem
