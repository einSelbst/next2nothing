# syntax=docker/dockerfile:1

# Image layer for building the application
FROM node:18-alpine as builder

RUN apk add --no-cache libc6-compat
RUN apk update

# setup pnpm
RUN corepack enable

# RUN yarn global add turbo @wundergraph/wunderctl
#RUN yarn global add turbo

# global npm dependencies: recommended to place those dependencies in the non-root user directory
#ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# optionally if you want to run npm global bin without specifying path
#ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /app

# rebuild image when package.json or lock has changed
# COPY package*.json ./
#COPY pnpm-lock.yaml ./
COPY . .
RUN pnpm dlx turbo prune --scope=api --docker
#RUN turbo prune --scope=api --docker

# install dependencies
FROM node:18-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
RUN corepack enable
WORKDIR /app

# First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# RUN npm ci --only=production
# RUN npm ci --omit=dev
RUN pnpm install -r --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# generate your wundergraph application
RUN pnpm turbo run build --filter=api...

# Image layer for production
FROM node:18-alpine as runner
WORKDIR /app

# copy entire project and dependencies
COPY --from=installer --chown=node:node /app/apps/api/node_modules ./node_modules
COPY --from=installer --chown=node:node /app/apps/api ./.wundergraph
# copy wunderctl
RUN yarn global add @wundergraph/wunderctl

#COPY --from=installer --chown=node:node /app/apps/api/node_modules/@wundergraph/sdk/node_modules/bin/wunderctl /usr/local/bin/wunderctl

RUN wunderctl version

# run as non-root user
USER node

WORKDIR /.wundergraph

CMD WG_NODE_HOST=0.0.0.0 wunderctl start

EXPOSE 9991

# # The web Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# # Make sure you update this Dockerfile, the Dockerfile in the web workspace and copy that over to Dockerfile in the docs.
# FROM node:alpine AS builder

# RUN corepack enable && corepack prepare pnpm@7.11.0 --activate

# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# RUN apk update
# RUN corepack enable && corepack prepare pnpm@7.11.0 --activate
# # Set working directory
# WORKDIR /app
# RUN yarn global add turbo
# # RUN pnpm add -g turbo
# COPY . .
# # RUN turbo prune --scope=api --docker

# # Add lockfile and package.json's of isolated subworkspace
# FROM node:alpine AS installer
# RUN apk add --no-cache libc6-compat
# RUN apk update
# WORKDIR /app

# # First install dependencies (as they change less often)
# # COPY .gitignore .gitignore
# COPY --from=builder /app/out/json/ .
# RUN corepack enable && corepack prepare pnpm@7.11.0 --activate
# COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# RUN pnpm fetch
# RUN pnpm install -r --frozen-lockfile --offline

# # Build the project and its dependencies
# COPY --from=builder /app/out/full/ .
# COPY turbo.json turbo.json
# RUN f turbo run build --filter=api...

# FROM node:alpine AS runner
# WORKDIR /app

# # Don't run production as root
# RUN addgroup --system --gid 1001 expressjs
# RUN adduser --system --uid 1001 expressjs
# USER expressjs
# COPY --from=installer /app .

# CMD node apps/api/dist/index.js
