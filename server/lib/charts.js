import config from '../config';

const logger = require('./logger')();

export function getChartsUrl() {
  const url = `${config.api.charts}`;

  logger.log(`getChartsUrl: url: ${url}`);
  return url;
}

export function getChartUrl(id) {
  const url = `${config.api.charts}/${id}`;

  logger.log(`getChartUrl: url: ${url}`);
  return url;
}

export function buildChartUI({ _id, meta, chart }, sample) {
  return {
    _id,
    meta: {
      ...meta,
      length: chart.length,
      roll: sample,
    },
    chart,
  };
}

export function buildChartSummaryUI(chart) {
  return {
    _id: chart._id,
    name: chart.meta.name,
    length: chart.chart.length,
    category: chart.meta.category,
  };
}
