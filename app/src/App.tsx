import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from 'honorable'

import theme from './theme'

import Layout from './components/Layout'
import AuthenticationProvider from './components/AuthenticationProvider'
import AuthenticationBouncer from './components/AuthenticationBouncer'
import FullScreenSpinner from './components/FullScreenSpinner'

const Home = lazy(() => import('./scenes/Home'))
const Authentication = lazy(() => import('./scenes/Authentication'))

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
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
