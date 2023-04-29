## Development

```sh
# set required environment variables
# for example with direnv
cp .env.example .env && direnv allow .

# start PostgreSQL and Redis
# for example with docker
docker compose up -d

# confirm Node.js is available
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
