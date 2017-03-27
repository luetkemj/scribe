import {
  deleteLogs,
  getLogs,
  createLogs,
  updateLog,
} from '../controllers/logs.controller';

module.exports = (router) => {
  router.route('/api/secure/logs').get(getLogs);
  router.route('/api/secure/logs').post(createLogs);
  router.route('/api/secure/logs/:id').patch(updateLog);
  router.route('/api/secure/logs').patch(deleteLogs);
};
