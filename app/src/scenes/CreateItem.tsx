import { FormEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, H1, Input } from 'honorable'
import { nanoid } from 'nanoid'
import { doc, setDoc } from 'firebase/firestore'

import useViewer from '../hooks/useViewer'

import { ItemType } from '../types'
import { db } from '../firebase'

import SimilarItems from '../components/SimilarItems'

function CreateItem() {
  const { viewer } = useViewer()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if (!viewer || loading) return

    const formatedName = name.trim()
    const formatedDescription = description.trim()

    if (!formatedName) return
    if (!formatedDescription) return

    setLoading(true)

    try {
      const id = nanoid()
      const now = new Date().toISOString()
      const item: ItemType = {
        id,
        name: formatedName,
        description: formatedDescription,
        imageUrls: [],
        verified: false,
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
  }, [viewer, loading, name, description, navigate])

  return (
    <>
      <H1>Collect anything</H1>
      <Form onSubmit={handleSubmit}>
        <Input
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="Name"
        />
        <Input
          value={description}
          onChange={event => setDescription(event.target.value)}
          placeholder="Description"
        />
        <Button
          disabled={!(name && description)}
          type="submit"
          loading={loading}
          onClick={handleSubmit}
        >
          Create collectible
        </Button>
      </Form>
      <SimilarItems itemName={name} />
    </>
  )
}

export default CreateItem
