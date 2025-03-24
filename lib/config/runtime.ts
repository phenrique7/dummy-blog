export const runtimeConfig = useRuntimeConfig() as unknown as {
  public: {
    appUrl: string;
  };
  sessionCookiePassword: string;
  github: {
    clientId: string;
    clientSecret: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
  };
};
