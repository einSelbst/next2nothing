import { createClient, Operations } from 'n2ngateway'
import { createHooks } from '@wundergraph/swr'
import type {} from '@wundergraph/sdk'

export const client = createClient()

export const { useQuery, useMutation, useSubscription, useUser, useAuth } =
  createHooks<Operations>(client)
