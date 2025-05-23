/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProblemsIndexImport } from './routes/problems/index'
import { Route as PlaylistsIndexImport } from './routes/playlists/index'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const AuthSignUpIndexLazyImport = createFileRoute('/auth/sign-up/')()
const AuthSignInIndexLazyImport = createFileRoute('/auth/sign-in/')()
const AuthProfileIndexLazyImport = createFileRoute('/auth/profile/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ProblemsIndexRoute = ProblemsIndexImport.update({
  id: '/problems/',
  path: '/problems/',
  getParentRoute: () => rootRoute,
} as any)

const PlaylistsIndexRoute = PlaylistsIndexImport.update({
  id: '/playlists/',
  path: '/playlists/',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignUpIndexLazyRoute = AuthSignUpIndexLazyImport.update({
  id: '/auth/sign-up/',
  path: '/auth/sign-up/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth/sign-up/index.lazy').then((d) => d.Route),
)

const AuthSignInIndexLazyRoute = AuthSignInIndexLazyImport.update({
  id: '/auth/sign-in/',
  path: '/auth/sign-in/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth/sign-in/index.lazy').then((d) => d.Route),
)

const AuthProfileIndexLazyRoute = AuthProfileIndexLazyImport.update({
  id: '/auth/profile/',
  path: '/auth/profile/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth/profile/index.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/playlists/': {
      id: '/playlists/'
      path: '/playlists'
      fullPath: '/playlists'
      preLoaderRoute: typeof PlaylistsIndexImport
      parentRoute: typeof rootRoute
    }
    '/problems/': {
      id: '/problems/'
      path: '/problems'
      fullPath: '/problems'
      preLoaderRoute: typeof ProblemsIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/profile/': {
      id: '/auth/profile/'
      path: '/auth/profile'
      fullPath: '/auth/profile'
      preLoaderRoute: typeof AuthProfileIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-in/': {
      id: '/auth/sign-in/'
      path: '/auth/sign-in'
      fullPath: '/auth/sign-in'
      preLoaderRoute: typeof AuthSignInIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-up/': {
      id: '/auth/sign-up/'
      path: '/auth/sign-up'
      fullPath: '/auth/sign-up'
      preLoaderRoute: typeof AuthSignUpIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/playlists': typeof PlaylistsIndexRoute
  '/problems': typeof ProblemsIndexRoute
  '/auth/profile': typeof AuthProfileIndexLazyRoute
  '/auth/sign-in': typeof AuthSignInIndexLazyRoute
  '/auth/sign-up': typeof AuthSignUpIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/playlists': typeof PlaylistsIndexRoute
  '/problems': typeof ProblemsIndexRoute
  '/auth/profile': typeof AuthProfileIndexLazyRoute
  '/auth/sign-in': typeof AuthSignInIndexLazyRoute
  '/auth/sign-up': typeof AuthSignUpIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/playlists/': typeof PlaylistsIndexRoute
  '/problems/': typeof ProblemsIndexRoute
  '/auth/profile/': typeof AuthProfileIndexLazyRoute
  '/auth/sign-in/': typeof AuthSignInIndexLazyRoute
  '/auth/sign-up/': typeof AuthSignUpIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/playlists'
    | '/problems'
    | '/auth/profile'
    | '/auth/sign-in'
    | '/auth/sign-up'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/playlists'
    | '/problems'
    | '/auth/profile'
    | '/auth/sign-in'
    | '/auth/sign-up'
  id:
    | '__root__'
    | '/'
    | '/playlists/'
    | '/problems/'
    | '/auth/profile/'
    | '/auth/sign-in/'
    | '/auth/sign-up/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  PlaylistsIndexRoute: typeof PlaylistsIndexRoute
  ProblemsIndexRoute: typeof ProblemsIndexRoute
  AuthProfileIndexLazyRoute: typeof AuthProfileIndexLazyRoute
  AuthSignInIndexLazyRoute: typeof AuthSignInIndexLazyRoute
  AuthSignUpIndexLazyRoute: typeof AuthSignUpIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  PlaylistsIndexRoute: PlaylistsIndexRoute,
  ProblemsIndexRoute: ProblemsIndexRoute,
  AuthProfileIndexLazyRoute: AuthProfileIndexLazyRoute,
  AuthSignInIndexLazyRoute: AuthSignInIndexLazyRoute,
  AuthSignUpIndexLazyRoute: AuthSignUpIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/playlists/",
        "/problems/",
        "/auth/profile/",
        "/auth/sign-in/",
        "/auth/sign-up/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/playlists/": {
      "filePath": "playlists/index.tsx"
    },
    "/problems/": {
      "filePath": "problems/index.tsx"
    },
    "/auth/profile/": {
      "filePath": "auth/profile/index.lazy.tsx"
    },
    "/auth/sign-in/": {
      "filePath": "auth/sign-in/index.lazy.tsx"
    },
    "/auth/sign-up/": {
      "filePath": "auth/sign-up/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
