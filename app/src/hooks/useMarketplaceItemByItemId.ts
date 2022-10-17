import { collection, getDocs, query, where } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { db } from '../firebase'
import { MarketplaceCollectibleType } from '../types'

function useMarketplaceItemByItemId(id: string) {
  const [loadingMarketplaceItem, setLoadingMarketplaceItem] = useState(true)
  const [marketplaceItem, setMarketplaceItem] = useState<MarketplaceCollectibleType | null>(null)

  const fetchItem = useCallback(async () => {
    const q = query(collection(db, 'marketplaceItems'), where('itemId', '==', id))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) setMarketplaceItem(querySnapshot.docs[0].data() as MarketplaceCollectibleType)

    setLoadingMarketplaceItem(false)
  }, [id])

  useEffect(() => {
    fetchItem()
  }, [fetchItem])

  return { marketplaceItem, loadingMarketplaceItem }
}

export default useMarketplaceItemByItemId
