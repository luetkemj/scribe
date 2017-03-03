import md5 from 'md5';

export function getUserGravatar(email = '') {
  const hash = md5(email.trim());
  return `https://www.gravatar.com/avatar/${hash}?d=http://i.imgur.com/zMtOZS4.png`;
}
