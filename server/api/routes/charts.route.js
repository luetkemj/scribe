import {
  getCharts,
  getChart,
} from '../controllers/charts.controller';

module.exports = (router) => {
  router.route('/api/charts').get(getCharts);
  router.route('/api/charts/:id').get(getChart);
};
