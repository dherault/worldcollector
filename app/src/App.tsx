import { Suspense, lazy } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from 'honorable'

import theme from './theme'

import Layout from './components/Layout'
import AuthenticationProvider from './components/AuthenticationProvider'
import AuthenticationBouncer from './components/AuthenticationBouncer'
import FullScreenSpinner from './components/FullScreenSpinner'
import SellItem from './scenes/SellItem'

const Home = lazy(() => import('./scenes/Home'))
const Authentication = lazy(() => import('./scenes/Authentication'))
const CreateItem = lazy(() => import('./scenes/CreateItem'))
const Item = lazy(() => import('./scenes/Item'))
const Portfolio = lazy(() => import('./scenes/Portfolio'))

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<FullScreenSpinner />}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={(
                <AuthenticationProvider>
                  <Layout />
                </AuthenticationProvider>
              )}
            >
              <Route
                index
                element={<Home />}
              />
              <Route
                path="sign-in"
                element={(
                  <Authentication />
                )}
              />
              <Route
                path="sign-up"
                element={(
                  <Authentication isSignUp />
                )}
              />
              <Route
                path="create"
                element={(
                  <AuthenticationBouncer>
                    <CreateItem />
                  </AuthenticationBouncer>
                )}
              />
              <Route
                path="~/:id"
                element={<Outlet />}
              >
                <Route
                  index
                  element={<Item />}
                />
                <Route
                  path="sell"
                  element={(
                    <AuthenticationBouncer>
                      <SellItem />
                    </AuthenticationBouncer>
                  )}
                />
              </Route>
              <Route
                path="u/:id"
                element={<Portfolio />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
