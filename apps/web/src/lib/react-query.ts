import { createHooks } from '@wundergraph/react-query';
import { createClient, Operations } from "n2ngateway";

export const client = createClient()

export const { useQuery, useMutation, useSubscription, useUser, useFileUpload, useAuth, queryKey } =
	createHooks<Operations>(client);
