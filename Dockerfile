FROM node:18.15.0-slim

WORKDIR /opt/plainstyle

COPY package.json package.json

RUN corepack enable

COPY pnpm-workspace.yaml pnpm-workspace.yaml
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY app/ app/

RUN pnpm install --frozen-lockfile
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
