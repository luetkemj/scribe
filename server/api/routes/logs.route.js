import {
  deleteLogs,
  getLog,
  getLogs,
  createLog,
  updateLog,
} from '../controllers/logs.controller';

module.exports = (router) => {
  router.route('/api/secure/logs').get(getLogs);
  router.route('/api/secure/logs/:id').get(getLog);
  router.route('/api/secure/logs').post(createLog);
  router.route('/api/secure/logs/:id').patch(updateLog);
  router.route('/api/secure/logs').patch(deleteLogs);
};
