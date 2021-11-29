export default () => {
  return {
    app: {
      port: parseInt(process.env.APP_PORT!),
      host: process.env.APP_HOST!,
    },
    databases: {
      mysql: {
        dbConnection: process.env.DB_CONNECTION!,
        host: process.env.MYSQL_HOST!,
        name: process.env.MYSQL_DATABASE!,
        port: parseInt(process.env.MYSQL_PORT!),
        user: process.env.MYSQL_USER!,
        password: process.env.MYSQL_ROOT_PASSWORD!,
      },
    },
    jwt: {
      secret: process.env.JWT_SECRET!,
    },
  };
};
