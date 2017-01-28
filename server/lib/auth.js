import config from '../../server/config';

export function getLogInUrl(username) {
  return `${config.api.users}/${username}`;
}

export function getCreateNewUserUrl(username) {
  return `${config.api.users}/${username}`;
}
