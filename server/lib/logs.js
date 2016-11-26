import config from '../config';

const logger = require('./logger')();

export function getLogsUrl(limit = 0, skip = 0) {
  const url = `${config.api.logs}?limit=${limit}&skip=${skip}`;

  logger.log(`getLogsUrl: url: ${url}`);
  return url;
}

export function getLogUrl(id) {
  const url = `${config.api.logs}/${id}`;

  logger.log(`getLogUrl: url: ${url}`);
  return url;
}

export function getCreateLogUrl() {
  const url = `${config.api.logs}`;

  logger.log(`getCreateLogsUrl: url: ${url}`);
  return url;
}

export function getUpdateLogUrl(id) {
  const url = `${config.api.logs}/${id}`;

  logger.log(`getUpdateLogsUrl: url: ${url}`);
  return url;
}

export function getDeleteLogUrl(id) {
  const url = `${config.api.logs}/${id}`;

  logger.log(`getUpdateLogsUrl: url: ${url}`);
  return url;
}

export function buildLogUI(log) {
  const logUI = {
    ...log,
  };

  return logUI;
}
