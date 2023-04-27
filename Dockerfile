FROM node:18.15.0-slim

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

ENV HOST 0.0.0.0
ENV PORT 3000
ENV SERVER_DOMAIN localhost
ENV DATABASE_URL postgresql://flatnavy:password@localhost:5432/flatnavy
ENV REDIS_URL redis://localhost:6379

CMD ["pnpm", "start"]
