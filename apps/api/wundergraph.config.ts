import {
  authProviders,
  configureWunderGraphApplication,
  cors,
  EnvironmentVariable,
  introspect,
  templates,
} from '@wundergraph/sdk'
import { NextJsTemplate } from '@wundergraph/nextjs/dist/template'
import server from './wundergraph.server'
import operations from './wundergraph.operations'

const faunaDB = introspect.graphql({
  apiNamespace: 'faunaDB',
  url: new EnvironmentVariable('FAUNADB_GRAPHQL_URL'),
  headers: builder => {
    builder.addStaticHeader(
      'Authorization',
      new EnvironmentVariable('FAUNADB_TOKEN')
    )
    return builder
  },
})

const countries = introspect.graphql({
  apiNamespace: 'countries',
  url: 'https://countries.trevorblades.com/',
})

const world = introspect.graphql({
  apiNamespace: 'world',
  url: 'https://countries.trevorblades.com',
})

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [faunaDB, countries, world],
  server,
  operations,
  codeGenerators: [
    {
      templates: [
        // use all the typescript react templates to generate a client
        ...templates.typescript.all,
        templates.typescript.operations,
        templates.typescript.linkBuilder,
      ],
    },
    {
      templates: [new NextJsTemplate()],
      path: '../../packages/n2ngateway',
    },
  ],
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === 'production'
        ? [
            // change this before deploying to production to the actual domain where you're deploying your app
            'http://localhost:3000',
          ]
        : [
            'http://localhost:3000',
            'http://127.0.0.1:3000/',
            new EnvironmentVariable('WG_ALLOWED_ORIGIN'),
          ],
  },
  authentication: {
    cookieBased: {
      providers: [authProviders.demo()],
      authorizedRedirectUris: ['http://localhost:3000'],
    },
  },
  dotGraphQLConfig: {
    hasDotWunderGraphDirectory: false,
  },
  security: {
    enableGraphQLEndpoint:
      process.env.NODE_ENV !== 'production' ||
      process.env.GITPOD_WORKSPACE_ID !== undefined,
  },
})
