import jwt from 'jsonwebtoken';
import config from '../config';

export function signJWT(id) {
  return jwt.sign(
    {
      id,
      iat: config.auth.authTokenIssuedAt(), // issued at
    },
    config.auth.secret,
    { expiresIn: config.auth.authTokenExpiresIn },
  );
}
