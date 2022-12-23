# syntax=docker/dockerfile:1

# https://docs.docker.com/build/hellobuild/
# https://github.com/pnpm/pnpm/issues/3114#issuecomment-1019512848
# https://pnpm.io/cli/fetch
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
# https://github.com/vercel/turbo/issues/1941#issuecomment-1246330480

# build stage
FROM node:16-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

# RUN corepack enable && corepack prepare pnpm@7.11.0 --activate
RUN corepack enable
WORKDIR /app

# Install dependencies based on the preferred package manager
# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# RUN \
# if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
# elif [ -f package-lock.json ]; then npm ci; \
# elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
# else echo "Lockfile not found." && exit 1; \
# fi

# copy app dependencies
COPY pnpm-lock.yaml tsconfig.json ./
RUN pnpm fetch
# RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store\
# pnpm fetch --prod

# FROM node:16-alpine AS builder
# WORKDIR /app
# COPY --from=base /app/node_modules ./node_modules

# copy source
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# install dev and production dependencies
RUN pnpm install -r --frozen-lockfile --offline
RUN pnpm build

# bundle production dependencies stage
FROM base AS builder

WORKDIR /usr/src/app
# cleanup existing folder
RUN rm -rf node_modules

ENV CI=1
ENV NODE_ENV=production

# COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod
RUN pnpm install -r --frozen-lockfile --offline --prod

# final stage
FROM mhart/alpine-node:slim-14 AS production

ENV CI=1
ENV NODE_ENV=production
ENV PORT=80
ENV HOST=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED 1

# add curl for healthcheck
RUN apk --no-cache add curl

WORKDIR /usr/app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Copy node modules and dist directory
# COPY package.json .
# COPY --from=deps /usr/src/app/node_modules ./node_modules
# COPY --from=base /usr/src/app/.next ./.next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# RUN chown -R node:node .
# USER node

# final configuration
HEALTHCHECK CMD curl -f http://0.0.0.0:80/healthcheck || exit 1
EXPOSE 80
# CMD ["node","--es-module-specifier-resolution=node", "dist/index.js"]
# CMD [ "pnpm", "serve", "--production"]
CMD ["node", "server.js"]
