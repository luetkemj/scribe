import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import glob from 'glob';
import history from 'connect-history-api-fallback';
import jwt from 'express-jwt';
import cookieParser from 'cookie-parser';
import config from './config';

const API_ROOT = path.join(__dirname, 'api');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const APP_ROOT = path.join(__dirname, '../');

// Create the express application
const app = express();

// gzip all the things
app.use(compression());

// use express' body parser to access body elements later
app.use(bodyParser.json());

// use express' cookie-parser to access cookies with req.cookies
app.use(cookieParser());

// Security / JWT configuration
app.use(jwt({
  secret: config.auth.secret,
  credentialsRequired: false,
  getToken: req => req.cookies[config.cookies.authToken],
}));

// if error clear token and force login.
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res
     .clearCookie(config.cookies.authToken)
     .redirect('/login')
     .status(401).send({ error: 'Unauthorized' });
  }

  return next();
});

// Always (attempt to) load the user information into the req
function requireAuthentication(req, res, next) {
  if (req.user) {
    return next();
  }
  return res
   .clearCookie(config.cookies.authToken)
   .status(401).send({ error: 'Unauthorized' });
}

// require auth on secure routes
app.all(['/api/secure/*'], requireAuthentication);

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
        to: context => context.parsedUrl.pathname,
      },
    ],
  }));

  // only load these dependencies if we are not in production to avoid
  // requiring them in production mode (when they are only required in dev)
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config');

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
