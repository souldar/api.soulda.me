import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.mysql = {
    client: {
      host: process.env.BLOG_DB_HOST,
      port: '3306',
      user: process.env.BLOG_DB_USERNAME,
      password: process.env.BLOG_DB_PASSWORD,
      database: process.env.BLOG_DB_DATABASE
    }
  };

  config.security = {
    domainWhiteList: ["localhost:3000"],
    csrf: {
      enable: false,
    }
  };
  config.cors = {
    credentials: true,
  }
  return config;
};
