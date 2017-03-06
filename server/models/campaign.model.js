const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  name: { type: String, unique: true },
  userId: { type: String, required: true },
}, { collection: 'campaigns' });

mongoose.model('Campaign', CampaignSchema, 'campaigns');
