## Development

```sh
# start PostgreSQL and Redis
docker compose up -d

# confirm Node.js
# see .node-version for required version
node -v

# enable pnpm
corepack enable pnpm

# install dependencies
pnpm install

# setup database
pnpm run prisma migrate dev

# start
pnpm run dev
```
