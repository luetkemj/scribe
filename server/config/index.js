const config = {
  port: process.env.PORT || 3000,
  rootUrl: process.env.SCRIBE_ROOT_URL || `http://localhost:${process.env.PORT || 3000}`,
  auth: {
    secret: process.env.SECRET || 'Joan Butt and Squids are terrible at keeping secrets',
    authTokenIssuedAt: () => Math.floor(Date.now() / 1000) - 30,
    authTokenExpiresIn: '3d',
  },
  bcyrpt: {
    saltRounds: 15,
  },
  cookies: {
    authToken: 'scribe_token',
  },
  mongo: {
    protocol: process.env.MONGO_PROTOCOL || 'mongodb://',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DB || 'scribe',
  },
};

export default config;
