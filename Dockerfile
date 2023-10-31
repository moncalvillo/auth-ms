FROM oven/bun:1.0.1
WORKDIR /app
COPY package*.json ./
COPY bun.lockb bun.lockb
RUN bun install
COPY . .
EXPOSE 8081
ENTRYPOINT ["bun", "index.ts"]