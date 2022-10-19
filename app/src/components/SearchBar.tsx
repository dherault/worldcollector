import { Div, Input, Menu, MenuItem, useOutsideClick } from 'honorable'
import { useNavigate } from 'react-router-dom'
import { useHits, useSearchBox } from 'react-instantsearch-hooks-web'
import { MdSearch } from 'react-icons/md'
import { useCallback, useEffect, useRef, useState } from 'react'

import useDebounce from '../hooks/useDebounce'

function SearchBar(props: any) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const { refine } = useSearchBox()
  const { hits } = useHits()
  const [show, setShow] = useState(false)
  const debouncedQuery = useDebounce(query, 333)
  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    setShow(false)
  }, [])

  useOutsideClick(rootRef, handleClose)

  useEffect(() => {
    refine(debouncedQuery)
  }, [debouncedQuery, refine])

  return (
    <Div
      ref={rootRef}
      position="relative"
      width={256 + 128 + 64 + 32 + 16 + 8 + 4 + 2}
      {...props}
    >
      <Input
        width="100%"
        value={query}
        onChange={event => {
          setQuery(event.target.value)
          setShow(true)
        }}
        placeholder="Search anything"
        startIcon={<MdSearch />}
        onFocus={() => setShow(true)}
        onClick={() => setShow(true)}
        border="1px solid darken(background-light, 5)"
        backgroundColor="background-light"
      />
      <Menu
        display={show ? 'block' : 'none'}
        width="100%"
        backgroundColor="background"
        position="absolute"
        top={42}
        left={0}
        zIndex={999999}
      >
        {hits.map((hit: any) => (
          <MenuItem
            key={hit.objectID}
            onClick={() => {
              handleClose()
              navigate(`/~/${hit.objectID}`)
            }}
          >
            {hit.name}
          </MenuItem>
        ))}
        {!hits.length && (
          <MenuItem
            disabled
            background="rainbow"
            color="white"
            onClick={() => {
              handleClose()
              navigate('/collect')
            }}
          >
            No results, click here to start collecting
          </MenuItem>
        )}
      </Menu>
    </Div>
  )
}

export default SearchBar
