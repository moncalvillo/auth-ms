export const Config = {
  database: {
    url: Bun.env.AUTH_MS_DATABASE_URL,
    dialect: Bun.env.AUTH_MS_DATABASE_DIALECT ?? "postgres",
    host: Bun.env.AUTH_MS_DATABASE_HOST ?? "auth-ms-db",
    port: Bun.env.AUTH_MS_DATABASE_PORT ?? 5432,
    username: Bun.env.AUTH_MS_DATABASE_USERNAME ?? "auth_user",
    password: Bun.env.AUTH_MS_DATABASE_PASSWORD ?? "auth_user_password",
    name: Bun.env.AUTH_MS_DATABASE_NAME ?? "auth_database",
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
