import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576938605100_3473';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.security = {
    domainWhiteList: [ 'localhost:3000' ],
    csrf: {
      enable: false,
    },
  };
  config.cors = {
    credentials: true,
  };

  config.mysql = {
    client: {
      host: process.env.BLOG_DB_HOST,
      port: '3306',
      user: process.env.BLOG_DB_USERNAME,
      password: process.env.BLOG_DB_PASSWORD,
      database: process.env.BLOG_DB_DATABASE,
    },
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
