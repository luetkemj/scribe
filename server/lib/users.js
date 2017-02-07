import md5 from 'md5';
import config from '../../server/config';

export function getCreateNewUserUrl() {
  return config.api.users;
}

export function getUserUrl(id) {
  return `${config.api.users}/${id}`;
}

export function getUserGravatar(email = '') {
  const hash = md5(email.trim());
  return `https://www.gravatar.com/avatar/${hash}?d=http://i.imgur.com/zMtOZS4.png`;
}
