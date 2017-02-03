import config from '../../server/config';

export function getAuthUrl() {
  return config.api.auth;
}
