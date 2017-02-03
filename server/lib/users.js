import config from '../../server/config';

export function getCreateNewUserUrl() {
  return config.api.users;
}
