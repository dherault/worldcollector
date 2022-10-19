import { Div, DivProps, H3 } from 'honorable'
import { useEffect, useMemo } from 'react'
import { useHits, useSearchBox } from 'react-instantsearch-hooks'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import { MdCheck } from 'react-icons/md'

import searchClient from '../algolia'

import { CollectibleType } from '../types'

import CollectibleCard from './CollectibleCard'

type SimilarVerifiedCollectiblesProps = DivProps & {
  collectible: CollectibleType
}

function SimilarVerifiedCollectiblesInner({ collectible, ...props }: SimilarVerifiedCollectiblesProps) {
  const { refine: setQuery } = useSearchBox()
  const { hits, results } = useHits()
  const hasResults = useMemo(() => !!(results?.query && hits.length), [results, hits])

  useEffect(() => {
    setQuery(collectible.name)
  }, [setQuery, collectible.name])

  return (
    <Div {...props}>
      <H3 mb={1}>
        Similar Verified Collectibles
      </H3>
      {hasResults && (
        <>
          <Div>
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
      {!hasResults && (
        <Div xflex="x4">
          <Div color="green.500">
            <MdCheck />
          </Div>
          <Div ml={1}>
            No similar collectible was found, you are the first one to collect this item!
          </Div>
        </Div>
      )}
    </Div>
  )
}

function SimilarVerifiedCollectibles(props: SimilarVerifiedCollectiblesProps) {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="worldcollector-verified-collectibles"
    >
      <SimilarVerifiedCollectiblesInner {...props} />
    </InstantSearch>
  )
}

export default SimilarVerifiedCollectibles
