import { Div } from 'honorable'
import { useEffect } from 'react'
import { useHits, useSearchBox } from 'react-instantsearch-hooks'
import { InstantSearch } from 'react-instantsearch-hooks-web'

import searchClient from '../algolia'

function SimilarItems({ itemName, ...props }: any) {
  const { query, refine: setQuery } = useSearchBox()
  const { hits, results } = useHits()

  useEffect(() => {
    setQuery(itemName)
  }, [setQuery, itemName])

  console.log('hits', hits)

  if (!results?.query) return null

  return (
    <Div
      xflex="x4"
      {...props}
    >
      {hits.map((hit: any) => (
        <Div key={hit.objectID}>
          {hit.name}
        </Div>
      ))}
    </Div>
  )
}

function SimilarItemsWrapper(props: any) {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="worldcollector-items"
    >
      <SimilarItems {...props} />
    </InstantSearch>
  )
}

export default SimilarItemsWrapper
