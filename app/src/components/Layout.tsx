import { Div, Nav } from 'honorable'
import { Link, Outlet } from 'react-router-dom'
import { SearchBox, useHits } from 'react-instantsearch-hooks-web'

import useViewer from '../hooks/useViewer'

function Layout() {
  const { viewer } = useViewer()

  return (
    <Div
      xflex="y2s"
      height="100vh"
      width="100vw"
      overflow="hidden"
      p={2}
    >
      <Nav
        xflex="x4"
        gap={1}
        mb={2}
      >
        <Link to="/create">Create</Link>
        <Link to="/marketplace">Marketplace</Link>
        <SearchBox />
        <HitsBox />
        <Div flexGrow={1} />
        {viewer && <Link to={`/u/${viewer.id}`}>Portfolio</Link>}
        <Link to="/sign-in">Sign in</Link>
      </Nav>
      <Outlet />
    </Div>
  )
}

function HitsBox() {
  const { hits, results } = useHits()

  if (!results?.query) return null

  return (
    <Div
      position="absolute"
      top={0}
      left={0}
    >
      {hits.map((hit: any) => (
        <Div
          key={hit.objectID}
          mb={0.5}
        >
          <Link to={`/~/${hit.objectID}`}>
            {hit.name}
          </Link>
        </Div>
      ))}
    </Div>
  )
}

export default Layout
