import config from '../../server/config';

export function getCreateNewUserUrl() {
  return config.api.users;
}

export function getUserUrl(id) {
  return `${config.api.users}/${id}`;
}
