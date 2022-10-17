import { Suspense, lazy } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from 'honorable'
import { InstantSearch } from 'react-instantsearch-hooks-web'

import theme from './theme'
import searchClient from './algolia'

import Layout from './components/Layout'
import AuthenticationProvider from './components/AuthenticationProvider'
import AuthenticationBouncer from './components/AuthenticationBouncer'
import FullScreenSpinner from './components/FullScreenSpinner'

const Home = lazy(() => import('./scenes/Home'))
const Authentication = lazy(() => import('./scenes/Authentication'))
const CreateCollectible = lazy(() => import('./scenes/CreateCollectible'))
const Item = lazy(() => import('./scenes/Item'))
const Portfolio = lazy(() => import('./scenes/Portfolio'))
const SellItem = lazy(() => import('./scenes/SellItem'))
const BuyItem = lazy(() => import('./scenes/BuyItem'))
const CollectibleTutorial = lazy(() => import('./scenes/CollectibleTutorial'))
const DesignSystem = lazy(() => import('./scenes/DesignSystem'))

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InstantSearch
        searchClient={searchClient}
        indexName="worldcollector-items"
      >
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
                  path="tutorial"
                  element={(
                    <AuthenticationBouncer>
                      <CollectibleTutorial />
                    </AuthenticationBouncer>
                  )}
                />
                <Route
                  path="collect"
                  element={(
                    <AuthenticationBouncer>
                      <CreateCollectible />
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
                  <Route
                    path="buy"
                    element={(
                      <AuthenticationBouncer>
                        <BuyItem />
                      </AuthenticationBouncer>
                    )}
                  />
                </Route>
                <Route
                  path="u/:id"
                  element={<Portfolio />}
                />
                <Route
                  path="design-system"
                  element={<DesignSystem />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </InstantSearch>
    </ThemeProvider>
  )
}

export default App
