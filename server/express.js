import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import glob from 'glob';
import history from 'connect-history-api-fallback';

const API_ROOT = path.join(__dirname, 'api');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const APP_ROOT = path.join(__dirname, '../');

// Create the express application
const app = express();

// use express' body parser to access body elements later
app.use(bodyParser.json());

// load the server controllers (via the routes)
const ROUTE_PATH = path.join(API_ROOT, 'routes');
const router = new express.Router();
glob(`${ROUTE_PATH}/**/*.js`, (err, files) => {
  files.map(file => require(file)(router));
});
app.use(router);

// in non-production environments, configure webpack dev middleware with hot reloading
if (!IS_PRODUCTION) {
  // use the history middleware to rewrite requests to our SPA
  // (only necessary in non-production mode b/c of webpack dev middleware)
  app.use(history({
    // to help in development, allow API requests to pass through
    rewrites: [
      {
        from: /^\/api\/.*$/,
        to: (context) => context.parsedUrl.pathname,
      },
    ],
  }));

  // only load these dependencies if we are not in production to avoid
  // requiring them in production mode (when they are only required in dev)
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config.js');

  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(path.join(APP_ROOT, 'public')));
}

// if at this point we don't have a route match for /api, return 404
app.all('/api/*', (req, res) => {
  res.status(404).send({
    error: `route not found: ${req.url}`,
  });
});

/*
 * THIS MUST BE THE LAST ROUTE
 * configure all remaining routes to hit the UI
 * This was done so that the root URL hits the UI app, and that UI app
 * handles all URLs under that. Know that at this point we have "reserved"
 * /api/*, for APIs. If that URL is used by the UI, it won't resolve correctly.
 *
 * Note that based on what we've done above, this will only take effect in
 * the production environment.
 */
app.all('*', (req, res) => {
  res.sendFile(path.join(APP_ROOT, 'public', 'index.html'));
});

export default app;
