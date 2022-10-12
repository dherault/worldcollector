import { Form, H1 } from 'honorable'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

import useItemById from '../hooks/useItemById'
import ViewerContext from '../contexts/ViewerContext'

import FullScreenSpinner from '../components/FullScreenSpinner'
import FullScreenForbidden from '../components/FullScreenForbidden'

function SellItem() {
  const { id = '' } = useParams()
  const { viewer } = useContext(ViewerContext)
  const item = useItemById(id)

  if (!item) {
    return (
      <FullScreenSpinner />
    )
  }

  if (item.ownerId !== viewer?.id) {
    return (
      <FullScreenForbidden />
    )
  }

  return (
    <>
      <H1>Sell {item.name}</H1>
      <Form>
        foo
      </Form>
    </>
  )
}

export default SellItem
