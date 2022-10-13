import { Div, Nav } from 'honorable'
import { Link, Outlet } from 'react-router-dom'
import { SearchBox, useHits } from 'react-instantsearch-hooks-web'

import useViewer from '../hooks/useViewer'

import BlurryDot from './BlurryDot'

function Layout() {
  const { viewer } = useViewer()

  return (
    <Div
      xflex="y2s"
      height="100vh"
      width="100vw"
      overflow="hidden"
    >
      <Nav
        xflex="x4"
        flexShrink={0}
        gap={1}
        p={2}
      >
        <Link to="/design-system">Design System</Link>
        <Link to="/create">Create</Link>
        <Link to="/marketplace">Marketplace</Link>
        <SearchBox />
        <HitsBox />
        <Div flexGrow={1} />
        {viewer && <Link to={`/u/${viewer.id}`}>Portfolio</Link>}
        <Link to="/sign-in">Sign in</Link>
      </Nav>
      <Div
        xflex="y2s"
        flexGrow={1}
        overflow="auto"
        p={2}
        position="relative"
      >
        <BlurryDot colors={['#6923ff', '#6923ff', '#0df']} />
        <BlurryDot colors={['#fa0', '#f0a', '#f0a']} />
        <Outlet />
      </Div>
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
