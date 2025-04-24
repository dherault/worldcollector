import ReactDOM from 'react-dom/client'
import LogRocket from 'logrocket'

import LazyLoadingErrorBoundary from '~components/common/LazyLoadingErrorBoundary'

import Router from '~router/Router'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LazyLoadingErrorBoundary>
    <Router />
  </LazyLoadingErrorBoundary>
)

if (import.meta.env.PROD) {
  LogRocket.init('world-collector/world-collector')
}
