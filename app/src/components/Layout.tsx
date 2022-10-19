import { Div, H4, Nav } from 'honorable'
import { Link, Outlet } from 'react-router-dom'

import useViewer from '../hooks/useViewer'

import SearchBar from './SearchBar'

function Layout() {
  const { viewer } = useViewer()

  return (
    <Div
      xflex="y2s"
      height="100vh"
      width="100vw"
      overflow="hidden"
      position="relative"
    >
      <Nav
        xflex="x41"
        flexShrink={0}
        pt={2}
        px={2}
        position="relative"
      >
        <Div
          xflex="x4"
          width="33.333%"
        >
          <H4>World Collector</H4>
          <Div ml={2}>
            <Link to="/collect">Create</Link>
          </Div>
          <Div ml={2}>
            <Link to="/marketplace">Marketplace</Link>
          </Div>
        </Div>
        <Div
          xflex="x5"
          width="33.333%"
        >
          <SearchBar />
        </Div>
        <Div
          xflex="x6"
          width="33.333%"
        >
          {viewer && <Link to={`/u/${viewer.id}`}>Portfolio</Link>}
          <Div ml={2}>
            <Link to="/sign-in">Sign in</Link>
          </Div>
        </Div>
      </Nav>
      <Div
        position="absolute"
        top={70}
        left={0}
        right={0}
        height={32}
        background="linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0) 100%)"
        zIndex={999999}
      />
      <Div
        xflex="y2s"
        flexGrow={1}
        position="relative"
        overflow="auto"
        pt={6}
        pb={2}
      >
        <Outlet />
      </Div>
    </Div>
  )
}

export default Layout
