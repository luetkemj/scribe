import {
  deleteLog,
  getLog,
  getLogs,
  createLog,
  updateLog,
} from '../controllers/logs.controller';

module.exports = (router) => {
  router.route('/api/logs').get(getLogs);
  router.route('/api/logs/:id').get(getLog);
  router.route('/api/logs').post(createLog);
  router.route('/api/logs/:id').patch(updateLog);
  router.route('/api/logs/:id').delete(deleteLog);
};
