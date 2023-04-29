FROM node:18.16.0-slim

WORKDIR /opt/flatnavy

COPY package.json package.json

RUN corepack enable

COPY pnpm-workspace.yaml pnpm-workspace.yaml
COPY turbo.json turbo.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY api/ api/
COPY backend/ backend/
COPY frontend/ frontend/

RUN pnpm install --frozen-lockfile
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
