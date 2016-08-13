const config = {
  port: process.env.PORT || 3000,
  mongo: {
    protocol: process.env.MONGO_PROTOCOL || 'mongodb://',
    host: process.env.MONGO_HOST || '@ds019054.mlab.com',
    port: process.env.MONGO_PORT || 19054,
    database: process.env.MONGO_DB || 'scribe',
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
  },
  api: {
    monsters: '/api/monsters',
    monster: '/api/monster',
    items: '/api/items',
  },
};

export default config;
