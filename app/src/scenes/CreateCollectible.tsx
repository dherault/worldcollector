import { FormEvent, useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Div, Form, H1, Input, Label } from 'honorable'
import { nanoid } from 'nanoid'
import { doc, setDoc } from 'firebase/firestore'

import useViewer from '../hooks/useViewer'

import { CollectibleType } from '../types'
import { db } from '../firebase'

import SimilarCollectibles from '../components/SimilarVerifiedCollectibles'
import LayoutContainer from '../components/LayoutContainer'

function CreateCollectible() {
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
      const item: CollectibleType = {
        id,
        name: formatedName,
        description: formatedDescription,
        imageStoragePaths: [],
        verificationStatus: 'pending',
        verificationMessage: '',
        ownerId: viewer.id,
        userId: viewer.id,
        createdAt: now,
        updatedAt: now,
      }

      await setDoc(doc(db, 'collectibles', id), item)

      navigate(`/~/${id}`)
    }
    catch (error) {
      console.error(error)

      setLoading(false)
      alert('An error occurred while creating the item.')
    }
  }, [viewer, loading, name, description, navigate])

  return (
    <LayoutContainer>
      <Div xflex="x4">
        <H1>Collect anything</H1>
        <Div
          flexGrow={1}
          xflex="x6"
        >
          <Link to="/tutorial">
            Run tutorial again
          </Link>
        </Div>
      </Div>
      <Form onSubmit={handleSubmit}>
        <Div mt={2}>
          <Label>
            Name
          </Label>
          <Input
            width="100%"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Mona Lisa"
            mt={0.5}
          />
        </Div>
        <Div mt={2}>
          <Label>
            Description
          </Label>
          <Input
            multiline
            minRows={3}
            width="100%"
            value={description}
            onChange={event => setDescription(event.target.value)}
            placeholder="A famous painting made by Leonardo Da Vinci in 1503"
            mt={0.5}
          />
        </Div>
        <Div xflex="x6">
          <Button
            gradient="rainbow"
            type="submit"
            loading={loading}
            onClick={handleSubmit}
            mt={2}
          >
            Create collectible
          </Button>
        </Div>
      </Form>
      <SimilarCollectibles collectible={{ name } as CollectibleType} />
    </LayoutContainer>
  )
}

export default CreateCollectible
