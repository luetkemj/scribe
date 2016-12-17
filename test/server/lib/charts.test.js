import should from 'should';


describe('The charts lib', () => {
  let chartsLib;
  let CHART;

  beforeEach(() => {
    chartsLib = require('../../../server/lib/charts');

    CHART = {
      _id: '1234',
      meta: {
        name: 'A Chart',
        category: 'Test',
      },
      chart: ['one', 'two'],
      extra: 'forget this',
    };
  });

  it('should exist', () => {
    should.exist(chartsLib);
  });

  describe('getChartsUrl', () => {
    it('should work', () => {
      const expected = '/api/charts';
      const actual = chartsLib.getChartsUrl();

      should(expected).equal(actual);
    });
  });

  describe('getChartUrl', () => {
    it('should work', () => {
      const expected = '/api/charts/1234';
      const actual = chartsLib.getChartUrl('1234');

      should(expected).equal(actual);
    });
  });

  describe('buildChartUI', () => {
    it('should work', () => {
      const expected = {
        _id: '1234',
        meta: {
          name: 'A Chart',
          category: 'Test',
          length: 2,
          roll: 'one',
        },
        chart: ['one', 'two'],
      };
      const actual = chartsLib.buildChartUI(CHART, 'one');

      should(expected).deepEqual(actual);
    });
  });

  describe('buildChartSummaryUI', () => {
    it('should work', () => {
      const expected = {
        _id: '1234',
        name: 'A Chart',
        length: 2,
        category: 'Test',
      };
      const actual = chartsLib.buildChartSummaryUI(CHART);

      should(expected).deepEqual(actual);
    });
  });
});
