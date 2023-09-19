export const Config = {
  database: {
    dialect: Bun.env.DATABASE_DIALECT ?? "postgres",
    host: Bun.env.DATABASE_HOST ?? "localhost",
    port: Bun.env.DATABASE_PORT ?? 5432,
    username: Bun.env.DATABASE_USERNAME ?? "postgres",
    password: Bun.env.DATABASE_PASSWORD ?? "postgres",
    name: Bun.env.DATABASE_NAME ?? "postgres",
  },
  nodeEnv: Bun.env.NODE_ENV ?? "development",
  server: {
    url: Bun.env.SERVER_URL ?? "http://localhost",
    port: Bun.env.SERVER_PORT ?? 8080,
  },
  jwt: {
    secret: Bun.env.JWT_SECRET ?? "secret",
  },
};
