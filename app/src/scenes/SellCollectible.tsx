import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Div, Form, H1, Input } from 'honorable'
import { nanoid } from 'nanoid'

import { doc, setDoc } from 'firebase/firestore'

import useViewer from '../hooks/useViewer'
import useCollectibleById from '../hooks/useCollectibleById'
import useMarketplaceCollectibleByCollectibleId from '../hooks/useMarketplaceCollectibleByCollectibleId'

import { db } from '../firebase'
import { MARKETPLACE_FEE_RATIO } from '../constants'
import { MarketplaceCollectibleType } from '../types'

import FullScreenSpinner from '../components/FullScreenSpinner'
import FullScreenForbidden from '../components/FullScreenForbidden'
import FullScreenNotFound from '../components/FullScreenNotFound'

function boundDigits(n: number) {
  return Number(n.toFixed(2))
}

function SellCollectible() {
  const { id = '' } = useParams()
  const { viewer } = useViewer()
  const { collectible, loadingCollectible } = useCollectibleById(id)
  const { marketplaceCollectible, loadingMarketplaceCollectible } = useMarketplaceCollectibleByCollectibleId(id)
  const [prices, setPrices] = useState<any>({ seller: 0, fee: 0, buyer: 0 })
  const navigate = useNavigate()

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if (!(collectible && viewer)) return

    const id = nanoid()
    const now = new Date().toISOString()
    const marketplaceCollectible: MarketplaceCollectibleType = {
      id,
      collectibleId: collectible.id,
      userId: viewer.id,
      price: prices.buyer,
      createdAt: now,
      updatedAt: now,
    }

    await setDoc(doc(db, 'marketplaceCollectibles', id), marketplaceCollectible)

    navigate(`/~/${collectible.id}`)
  }, [viewer, collectible, prices.buyer, navigate])

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
      buyer: boundDigits(value * (1 + MARKETPLACE_FEE_RATIO)),
    })
  }, [])

  const handleBuyerChange = useCallback((event: ChangeEvent) => {
    const value = Number((event.target as HTMLInputElement).value)

    if (value !== value) {
      setPrices({})

      return
    }

    const seller = value / (1 + MARKETPLACE_FEE_RATIO)

    setPrices({
      seller: boundDigits(seller),
      fee: boundDigits(seller * MARKETPLACE_FEE_RATIO),
      buyer: boundDigits(value),
    })
  }, [])

  if (loadingCollectible || loadingMarketplaceCollectible) {
    return (
      <FullScreenSpinner />
    )
  }

  if (!collectible) {
    return (
      <FullScreenNotFound />
    )
  }

  if (collectible.ownerId !== viewer?.id || marketplaceCollectible) {
    return (
      <FullScreenForbidden />
    )
  }

  return (
    <>
      <H1>Sell {collectible.name}</H1>
      <Form
        onSubmit={handleSubmit}
        xflex="x4"
        gap={1}
      >
        <Input
          type="number"
          value={prices.seller.toString()}
          onChange={handleSellerChange}
        />
        <Div>Fee: {prices.fee}</Div>
        <Input
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

export default SellCollectible
