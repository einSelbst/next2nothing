import {
	createWunderGraphNext as createWunderGraphNextInternal,
	WithWunderGraphOptions,
	SSRCache,
} from "@wundergraph/nextjs";
import { User } from "@wundergraph/sdk/client";
import { createClient, Operations, UserRole } from "n2ngateway";

export interface WunderGraphPageProps {
	ssrCache?: SSRCache;
	user?: User<UserRole>;
}

export interface CreateWunderGraphNextOptions extends Omit<WithWunderGraphOptions, "client"> {
	baseURL?: string;
}

export const createWunderGraphNext: any = (options: CreateWunderGraphNextOptions) => {
	const { baseURL, ...rest } = options;
	const client = createClient(
		baseURL
			? {
					baseURL,
			  }
			: undefined
	);

	return createWunderGraphNextInternal<Operations>({
		client,
		...rest,
	});
};

const { client, withWunderGraph, useQuery, useMutation, useSubscription, useUser, useAuth, useFileUpload } =
	createWunderGraphNext({
		ssr: true,
	});

export { client, withWunderGraph, useQuery, useMutation, useSubscription, useUser, useAuth, useFileUpload };
