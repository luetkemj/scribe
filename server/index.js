// load the configuration
import config from './config';
// load the mongo database
import './mongo';
// load the express application
import app from './express';

// initialize the configuration first!
require('./config/init')();

const logger = require('./lib/logger')();

// output the configuration
logger.log('config: %j', config);

// start the application
app.listen(config.port, (err) => {
  if (err) {
    logger.log(err);
  }

  logger.log(`Express server listening on port ${config.port} ` +
    `in ${process.env.NODE_ENV} environment`);

  // log logo
  logger.log(`
  ======╔═╗╔═╗╦═╗╦╔╗ ╔═╗======
  ======╚═╗║  ╠╦╝║╠╩╗║╣=======
  ======╚═╝╚═╝╩╚═╩╚═╝╚═╝======
  `);
});
