const config = {
  port: process.env.PORT || 3000,
  mongo: {
    protocol: process.env.MONGO_PROTOCOL || 'mongodb://',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DB || 'scribe',
  },
  api: {
    monsters: '/api/monsters',
    items: '/api/items',
    logs: '/api/logs',
  },
};

export default config;
