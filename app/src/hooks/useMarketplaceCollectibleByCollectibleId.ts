import { collection, getDocs, query, where } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { db } from '../firebase'
import { MarketplaceCollectibleType } from '../types'

function useMarketplaceCollectibleByCollectibleId(id: string) {
  const [loadingMarketplaceCollectible, setLoadingMarketplaceCollectible] = useState(true)
  const [marketplaceCollectible, setMarketplaceCollectible] = useState<MarketplaceCollectibleType | null>(null)

  const fetchCollectible = useCallback(async () => {
    const q = query(collection(db, 'marketplaceItems'), where('itemId', '==', id))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) setMarketplaceCollectible(querySnapshot.docs[0].data() as MarketplaceCollectibleType)

    setLoadingMarketplaceCollectible(false)
  }, [id])

  useEffect(() => {
    fetchCollectible()
  }, [fetchCollectible])

  return { marketplaceCollectible, loadingMarketplaceCollectible }
}

export default useMarketplaceCollectibleByCollectibleId
