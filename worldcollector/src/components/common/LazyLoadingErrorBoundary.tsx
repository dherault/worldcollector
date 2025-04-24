import { Component, type PropsWithChildren } from 'react'

class LazyLoadingErrorBoundary extends Component<PropsWithChildren> {
  // Prevent a Vitejs error
  // https://github.com/vitejs/vite/issues/11804
  componentDidCatch(error: Error) {
    if (error.message.includes('Failed to fetch dynamically imported module')) {
      window.location.reload()
    }
  }

  render() {
    return this.props.children
  }
}

export default LazyLoadingErrorBoundary
