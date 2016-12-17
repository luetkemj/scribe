const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChartSchema = new Schema({
  meta: {
    name: String,
    description: String,
    category: String,
    type: String,
    sources: [{
      title: String,
      author: String,
      author_link: String,
    }],
  },
  chart: [],
});

mongoose.model('Chart', ChartSchema, 'charts');
