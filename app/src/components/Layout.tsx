import { Div, Nav } from 'honorable'
import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'

import ViewerContext from '../contexts/ViewerContext'

function Layout() {
  const { viewer } = useContext(ViewerContext)

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
        <Link to="create">Create</Link>
        <Div flexGrow={1} />
        {viewer && <Link to={`u/${viewer.id}`}>Portfolio</Link>}
        <Link to="sign-in">Sign in</Link>
      </Nav>
      <Outlet />
    </Div>
  )
}

export default Layout
