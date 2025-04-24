import type { Route } from '~router/logic/types'

export const appRoute: Route = {}

export const routeNameReplacements = {
  '~': 'tilde',
  '-': 'dash',
}

export const noSitemapPrefixes = [
  'administrator',
  'dev',
]
