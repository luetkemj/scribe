import * as _ from 'lodash';
import mongoose from 'mongoose';
import { buildChartUI, buildChartSummaryUI } from '../../lib/charts';

const logger = require('../../lib/logger')();

const Chart = mongoose.model('Chart');

export function getCharts(req, res) {
  Chart
  .find()
  .lean()
  .exec((err, charts) => {
    if (!err) {
      logger.log(`getCharts: charts.length: ${charts.length}`);
      const chartsUI = _.map(charts, chart => (buildChartSummaryUI(chart)));
      return res.send(chartsUI);
    }
    logger.log('getCharts Error: %j', err);
    return res.send(err);
  });
}

export function getChart(req, res) {
  const { id } = req.params;

  Chart
  .findById(id)
  .lean()
  .exec((err, chart) => {
    if (!err) {
      const sample = _.sample(chart.chart);
      const chartUI = buildChartUI(chart, sample);
      logger.log('getChart: %o', chartUI.meta);
      return res.send(chartUI);
    }
    logger.log('getChart Error: %j', err);
    return res.send(err);
  });
}
