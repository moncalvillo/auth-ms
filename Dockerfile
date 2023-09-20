FROM oven/bun:0.5.9
WORKDIR /app
COPY package*.json ./
COPY bun.lockb bun.lockb
RUN bun install
COPY . .
EXPOSE 8080
ENTRYPOINT ["bun", "index.ts"]