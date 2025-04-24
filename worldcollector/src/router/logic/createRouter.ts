import fs from 'node:fs'
import path from 'node:path'

import capitalize from '~utils/string/capitalize'
import camelify from '~utils/string/camelify'

import type { Route } from '~router/logic/types'
import { appRoute, routeNameReplacements } from '~router/logic/data'

const LAYOUT = 'layout'
const PAGE = 'page'
const LOADING = 'loading'
const NOT_FOUND = 'not-found'
const EXTENSION = '.tsx'
const LAYOUT_WITH_EXTENSION = LAYOUT + EXTENSION
const PAGE_WITH_EXTENSION = PAGE + EXTENSION
const LOADING_WITH_EXTENSION = LOADING + EXTENSION
const NOT_FOUND_WITH_EXTENSION = NOT_FOUND + EXTENSION
const SUB_ROUTER = 'SubRouter'
const APP_PATH = '~app'
const ROUTER_PATH = '~router'
const SUB_ROUTER_PATH = 'subRouters'
const LAZY_SUFFIX = '...'
const DIRECTORY_IGNORE_PREFIX = '_'

const subRoutersPath = path.join(__dirname, '..', SUB_ROUTER_PATH)
const appPath = path.resolve(__dirname, '../../app')

const routeToIndex: Record<string, number> = {}

function deleteSubRouters() {
  if (!fs.existsSync(subRoutersPath)) {
    fs.mkdirSync(subRoutersPath)

    return
  }

  for (const file of fs.readdirSync(subRoutersPath)) {
    fs.unlinkSync(path.join(subRoutersPath, file))
  }
}

function createRoutes(routePath = appPath, route = appRoute) {
  let name = path.basename(routePath)
  const isParam = name.startsWith('[') && name.endsWith(']')
  const lazy = name.endsWith(LAZY_SUFFIX)

  if (lazy) name = name.slice(0, -LAZY_SUFFIX.length)
  if (isParam) name = name.slice(1, -1)

  const importPath = name

  // Custom for this project, replace ~ with tilde
  Object.keys(routeNameReplacements).forEach(key => {
    name = name.replace(key, routeNameReplacements[key as keyof typeof routeNameReplacements])
  })

  const relativePath = path.relative(appPath, routePath)

  console.log('-->', relativePath || 'root', lazy ? '(lazy)' : '')

  routeToIndex[name] = typeof routeToIndex[name] === 'number' ? routeToIndex[name] + 1 : 0

  const index = routeToIndex[name] || ''

  route.lazy = lazy
  route.name = capitalize(camelify(name + index))
  route.path = routePath === appPath ? '/' : isParam ? `:${importPath}` : importPath
  route.importPath = `${APP_PATH}/${relativePath}${relativePath ? '/' : ''}`
  route.lazyImportPath = `${ROUTER_PATH}/${SUB_ROUTER_PATH}/${route.name}${SUB_ROUTER}`
  route.children = []

  fs.readdirSync(routePath).forEach(fileName => {
    const filePath = path.join(routePath, fileName)

    if (fileName === LAYOUT_WITH_EXTENSION) route.layout = true
    else if (fileName === PAGE_WITH_EXTENSION) route.page = true
    else if (fileName === LOADING_WITH_EXTENSION) route.loading = true
    else if (fileName === NOT_FOUND_WITH_EXTENSION) route.notFound = true
    else if (fs.statSync(filePath).isDirectory() && !fileName.startsWith(DIRECTORY_IGNORE_PREFIX)) {
      route.children!.push({})

      createRoutes(filePath, route.children!.at(-1))
    }
  })
}

function createLazyRoutes(route = appRoute) {
  if (!route.children) return

  route.children.forEach(childRoute => {
    if (childRoute.lazy) createLazyRoute(childRoute)

    createLazyRoutes(childRoute)
  })
}

function createLazyRoute(route: Route) {
  fs.writeFileSync(path.join(subRoutersPath, `${route.name}${SUB_ROUTER}.tsx`), printSubRouter(route), 'utf8')
}

function printRouteImports(route: Route, lazy = true): string {
  const lines = []

  if (route.lazy && lazy) {
    lines.push(`const ${route.name}${SUB_ROUTER} = lazy(() => import('${route.lazyImportPath}'))`)

    return lines.join('\n')
  }
  if (route.layout) {
    if (route.lazy && lazy) lines.push(`const ${route.name}Layout = lazy(() => import('${route.importPath}${LAYOUT}'))`)
    else lines.push(`import ${route.name}Layout from '${route.importPath}${LAYOUT}'`)
  }
  if (route.page) {
    if (route.lazy && lazy) lines.push(`const ${route.name} = lazy(() => import('${route.importPath}${PAGE}'))`)
    else lines.push(`import ${route.name} from '${route.importPath}${PAGE}'`)
  }
  if (route.loading) {
    if (route.lazy && lazy) lines.push(`const ${route.name}Loading = lazy(() => import('${route.importPath}${LOADING}'))`)
    else lines.push(`import ${route.name}Loading from '${route.importPath}${LOADING}'`)
  }
  if (route.notFound) {
    if (route.lazy && lazy) lines.push(`const ${route.name}NotFound = lazy(() => import('${route.importPath}${NOT_FOUND}'))`)
    else lines.push(`import ${route.name}NotFound from '${route.importPath}${NOT_FOUND}'`)
  }

  if (route.children) {
    lines.push(...route.children.map(childRoute => printRouteImports(childRoute)))

    route.children.forEach(childRoute => {
      if (!childRoute.loading) return

      lines.push(`import ${childRoute.name}Loading from '${childRoute.importPath}${LOADING}'`)
    })
  }

  return lines.join('\n')
}

function printRoute(route: Route, lazy = true): string {
  const lines = []

  if (route.lazy && lazy) {
    const loadingComponent = route.loading ? `${route.name}Loading` : `CenteredSpinner source="Router ${route.name}"`

    lines.push(`<Route path="${route.path}/*" element={<Suspense fallback={<${loadingComponent} />}><${route.name}SubRouter /></Suspense>} />`)

    return lines.join('\n')
  }

  if (route.layout || route.page) {
    lines.push(`<Route path="${route.lazy ? '' : route.path}" element={${route.layout ? `<${route.name}Layout><Outlet /></${route.name}Layout>` : '<Outlet />'}}>`)
  }
  else {
    lines.push(`<Route path="${route.lazy ? '' : route.path}" element={<Outlet />}>`)
  }

  if (route.page) {
    lines.push(`<Route index element={<${route.name} />} />`)
  }
  if (route.children) {
    lines.push(...route.children.map(childRoute => printRoute(childRoute)))
  }

  lines.push(`<Route path="*" element={<${route.notFound ? route.name : ''}NotFound />} />`)
  lines.push('</Route>')

  return lines.join('\n')
}

function printSubRouter(route: Route) {
  const routeOutput = printRoute(route, false)
  const routeImportsOutput = printRouteImports(route, false)

  return `// ! Do not edit this file directly, use npm run router instead
${routeImportsOutput.includes('lazy(') ? 'import { Suspense, lazy } from \'react\'' : ''}
import { Outlet, Route, Routes } from 'react-router'
${routeOutput.includes('<NotFound') ? "import NotFound from '~components/common/NotFound'" : ''}
${routeOutput.includes('<CenteredSpinner') ? "import CenteredSpinner from '~components/common/CenteredSpinner'" : ''}
${routeImportsOutput}

function ${route.name}SubRouter() {
  return (
    <Routes>
      ${routeOutput}
    </Routes>
  )
}

export default ${route.name}SubRouter
`
}

function printRouter() {
  const routeOutput = printRoute(appRoute)
  const routeImportsOutput = printRouteImports(appRoute)

  return `// ! Do not edit this file directly, use npm run router instead
${routeImportsOutput.includes('lazy(') ? 'import { Suspense, lazy } from \'react\'' : ''}
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
${routeOutput.includes('<NotFound') ? "import NotFound from '~components/common/NotFound'" : ''}
${routeOutput.includes('<CenteredSpinner') ? "import CenteredSpinner from '~components/common/CenteredSpinner'" : ''}
${routeImportsOutput}

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<CenteredSpinner source="RouterRoot" />}>
        <Routes>
          ${routeOutput}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
`
}

function createRouter() {
  deleteSubRouters()
  createRoutes()
  createLazyRoutes()

  return printRouter()
}

export default createRouter
