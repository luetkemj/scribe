import mongoose from 'mongoose';
import path from 'path';
import glob from 'glob';
import config from './config';

const logger = require('./lib/logger')();

// don't load the database when running the test app
if (!process.env.TEST_APP) {
  const mongoUrl =
  `${config.mongo.protocol}${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`;

  mongoose.connect(mongoUrl, (err) => {
    if (err) {
      logger.error('Could not connect to MongoDB: %s', err.message);
      throw err;
    } else {
      logger.log('Connected to MongoDB');
      mongoose.connection.on('disconnected', () => {
        const errorMsg = 'Lost connection to MongoDB';
        logger.error(errorMsg);
        throw new Error(errorMsg);
      });
    }
  });
}

// load all the mongoose models
const MODELS_PATH = path.join(__dirname, 'models');
const files = glob.sync(`${MODELS_PATH}/**/*.js`);
files.map(file => require(file));
