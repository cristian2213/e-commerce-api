export type Environment = {
  app: {
    host: string;
    port: number;
  };
  databases: {
    mysql: {
      host: string;
      name: string;
      port: number;
      user: string;
      password: string;
    };
  };

  jwt: {};
};
