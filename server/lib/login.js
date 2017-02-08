import config from '../../server/config';

export function getLoginUrl() {
  return config.api.login;
}

export function getLogoutUrl() {
  return config.api.logout;
}
