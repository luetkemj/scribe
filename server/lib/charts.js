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
