import { ChangeEvent, FormEvent, useCallback, useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Div, Form, H1, Input } from 'honorable'
import { nanoid } from 'nanoid'

import { doc, setDoc } from 'firebase/firestore'

import useItemById from '../hooks/useItemById'
import ViewerContext from '../contexts/ViewerContext'

import { MARKETPLACE_FEE_RATIO } from '../constants'
import { MarketplaceItemType } from '../types'

import FullScreenSpinner from '../components/FullScreenSpinner'
import FullScreenForbidden from '../components/FullScreenForbidden'
import { db } from '../firebase'

function boundDigits(n: number) {
  return Number(n.toFixed(2))
}

function SellItem() {
  const { id = '' } = useParams()
  const { viewer } = useContext(ViewerContext)
  const item = useItemById(id)
  const [prices, setPrices] = useState<any>({ seller: 0, fee: 0, buyer: 0 })
  const navigate = useNavigate()

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if (!(item && viewer)) return

    const id = nanoid()
    const now = new Date().toISOString()
    const marketplaceItem: MarketplaceItemType = {
      id,
      itemId: item.id,
      userId: viewer.id,
      price: prices.buyer,
      createdAt: now,
      updatedAt: now,
    }

    await setDoc(doc(db, 'marketplaceItems', id), marketplaceItem)

    navigate(`/~/${item.id}`)
  }, [viewer, item, prices.buyer, navigate])

  const handleSellerChange = useCallback((event: ChangeEvent) => {
    const value = Number((event.target as HTMLInputElement).value)

    console.log('value', value)
    if (value !== value) {
      setPrices({})

      return
    }

    setPrices({
      seller: boundDigits(value),
      fee: boundDigits(value * MARKETPLACE_FEE_RATIO),
      buyer: boundDigits(value * (1 - MARKETPLACE_FEE_RATIO)),
    })
  }, [])

  const handleBuyerChange = useCallback((event: ChangeEvent) => {
    const value = Number((event.target as HTMLInputElement).value)

    if (value !== value) {
      setPrices({})

      return
    }

    const seller = value / (1 - MARKETPLACE_FEE_RATIO)

    setPrices({
      seller: boundDigits(seller),
      fee: boundDigits(seller * MARKETPLACE_FEE_RATIO),
      buyer: boundDigits(value),
    })
  }, [])

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
      <Form onSubmit={handleSubmit}>
        <Input
          display="block"
          type="number"
          value={prices.seller.toString()}
          onChange={handleSellerChange}
        />
        <Div>Fee: {prices.fee}</Div>
        <Input
          display="block"
          type="number"
          value={prices.buyer.toString()}
          onChange={handleBuyerChange}
        />
        <Button onClick={handleSubmit}>
          Put on marketplace
        </Button>
      </Form>
    </>
  )
}

export default SellItem
