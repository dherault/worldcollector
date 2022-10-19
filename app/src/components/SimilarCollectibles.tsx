import { Div, DivProps, H3 } from 'honorable'
import { useEffect } from 'react'
import { useHits, useSearchBox } from 'react-instantsearch-hooks'
import { InstantSearch } from 'react-instantsearch-hooks-web'

import searchClient from '../algolia'

import { CollectibleType } from '../types'

import CollectibleCard from './CollectibleCard'

type SimilarCollectiblesProps = DivProps & {
  collectible: CollectibleType
}

function SimilarCollectibles({ collectible, ...props }: SimilarCollectiblesProps) {
  const { refine: setQuery } = useSearchBox()
  const { hits, results } = useHits()

  useEffect(() => {
    setQuery(collectible.name)
  }, [setQuery, collectible.name])

  console.log('hits', hits)

  return (
    <Div {...props}>
      <H3>Similar Verified Collectibles</H3>
      {!!results?.query && (
        <>
          <Div mt={2}>
            Some similar collectibles were found, make sure you are the first one to collect this item.
          </Div>
          <Div
            xflex="x41"
            mt={1}
          >
            {hits.map(hit => (
              <Div
                key={hit.objectID}
                mr={2}
              >
                <CollectibleCard collectible={hit as any as CollectibleType} />
              </Div>
            ))}
          </Div>
        </>
      )}
      {!results?.query && (
        <Div mt={2}>
          No similar collectible was found, you are the first one to collect this item!
        </Div>
      )}
    </Div>
  )
}

function SimilarCollectiblesWrapper(props: SimilarCollectiblesProps) {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="worldcollector-verified-collectibles"
    >
      <SimilarCollectibles {...props} />
    </InstantSearch>
  )
}

export default SimilarCollectiblesWrapper
