import { Div, Nav } from 'honorable'
import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <Div
      xflex="y2s"
      height="100vh"
      width="100vw"
      overflow="hidden"
    >
      <Nav
        xflex="x4"
        gap={1}
      >
        <Link to="sign-in">Sign in</Link>
        <Link to="create">Create</Link>
      </Nav>
      <Outlet />
    </Div>
  )
}

export default Layout
