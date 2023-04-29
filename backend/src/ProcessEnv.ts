export class ProcessEnv {
  #_brand!: never;

  readonly production = process.env.NODE_ENV == "production";
  readonly listenHost = process.env.HOST ?? "0.0.0.0";
  readonly listenPort = Number(process.env.PORT ?? 3000);
  readonly redisUrl = process.env.REDIS_URL;
  readonly serverDomain = process.env.SERVER_DOMAIN ?? "invalid";
  readonly serverAccessTokenTtl = process.env.SERVER_ACCESS_TOKEN_TTL ?? "PT1H";
  readonly serverRefreshTokenTtl =
    process.env.SERVER_REFRESH_TOKEN_TTL ?? "PT72H";

  static readonly current = new ProcessEnv();

  private constructor() {
    // do nothing
  }
}
