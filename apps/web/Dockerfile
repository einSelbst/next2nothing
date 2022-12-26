# syntax=docker/dockerfile:1

# https://docs.docker.com/build/hellobuild/
# https://github.com/pnpm/pnpm/issues/3114#issuecomment-1019512848
# https://pnpm.io/cli/fetch
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
# https://github.com/vercel/turbo/issues/1941#issuecomment-1246330480

# 1. Generate a sparse/partial monorepo with a pruned lockfile for a target workspace. https://turborepo.org/docs/reference/command-line-reference#turbo-prune---scopetarget

# Refer to this original https://github.com/vercel/turborepo/blob/main/examples/with-docker/apps/web/Dockerfile

FROM node:18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
RUN yarn global add turbo@1.7.0-canary.5
COPY . .
RUN corepack enable
# will remove `turbo@1.4.7-canary.0` to `turbo` after stable release of 1.4.7

#RUN pnpm dlx turbo@1.7.0-canary.5 prune --scope=web --docker
RUN turbo prune --scope=web --docker

# 2. Rebuild the source code only when needed
FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# Build the project and its dependencies
ENV NEXT_TELEMETRY_DISABLED 1

# set your APP_NAME
ENV APP_NAME=web

#COPY .gitignore .gitignore
COPY --from=deps /app/out/json/ .
COPY --from=deps /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN corepack enable
RUN pnpm install
#RUN pnpm install --frozen-lockfile --offline

COPY --from=deps /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=$APP_NAME...

# 3. Production image, copy all the files and run next
FROM node:18-alpine AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production

# set your APP_NAME
ENV APP_NAME=web

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# comment out below if you don't have public folder
COPY --from=builder /app/apps/$APP_NAME/public public

COPY --from=builder --chown=nextjs:nodejs /app/apps/$APP_NAME/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/$APP_NAME/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD node apps/$APP_NAME/server.js

# # build stage
# FROM node:18-alpine AS base

# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# RUN apk update

# # RUN corepack enable && corepack prepare pnpm@7.11.0 --activate
# RUN corepack enable
# WORKDIR /app

# RUN yarn global add turbo

# # Install dependencies based on the preferred package manager
# # COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# # RUN \
# # if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
# # elif [ -f package-lock.json ]; then npm ci; \
# # elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
# # else echo "Lockfile not found." && exit 1; \
# # fi

# # copy app dependencies
# # COPY pnpm-lock.yaml tsconfig.json ./
# COPY . .
# RUN turbo prune --scope=web --docker
#     RUN ls -la
#     RUN cd out
#     RUN ls -la

# # WORKDIR /app
# # COPY --from=base /app/node_modules ./node_modules

# #COPY pnpm-lock.yaml ./

# # RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store\
# # pnpm fetch --prod

# # copy source
# #COPY . .

# # bundle production dependencies stage
# #FROM base AS builder
# FROM node:18-alpine AS builder
# RUN apk add --no-cache libc6-compat
# RUN apk update
# RUN corepack enable

#     WORKDIR /app

#    COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
#     RUN pnpm fetch

# COPY --from=base /app/out/json/ .

# # install dev and production dependencies
# RUN pnpm install -r --frozen-lockfile --offline
# #RUN pnpm install -r
# #RUN pnpm build

# # Next.js collects completely anonymous telemetry data about general usage.
# # Learn more here: https://nextjs.org/telemetry
# # Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# COPY --from=base /app/out/full/ .
# COPY turbo.json turbo.json
# RUN pnpm turbo run build --filter=web...

# # cleanup existing folder
# RUN rm -rf node_modules

# ENV CI=1
# ENV NODE_ENV=production

# # COPY pnpm-lock.yaml ./
# RUN pnpm fetch --prod
# RUN pnpm install -r --frozen-lockfile --offline --prod

# # final stage
# FROM mhart/alpine-node:slim-18 AS production

# ENV CI=1
# ENV NODE_ENV=production
# ENV PORT=80
# ENV HOST=0.0.0.0
# ENV NEXT_TELEMETRY_DISABLED 1

# # add curl for healthcheck
# RUN apk --no-cache add curl

# WORKDIR /app

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# # Copy node modules and dist directory
# # COPY package.json .
# COPY --from=builder /app/node_modules ./node_modules
# #COPY --from=base /app/.next ./.next

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# # RUN chown -R node:node .
# # USER node

# # final configuration
# HEALTHCHECK CMD curl -f http://0.0.0.0:80/healthcheck || exit 1
# EXPOSE 80
# # CMD ["node","--es-module-specifier-resolution=node", "dist/index.js"]
# # CMD [ "pnpm", "serve", "--production"]
# CMD ["node", "server.js"]
