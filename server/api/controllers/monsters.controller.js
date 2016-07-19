const mongoose = require('mongoose');

const Monster = mongoose.model('Monster');

export function getMonsters(req, res) {
  const { limit, skip } = req.query;

  Monster
  .find({})
  .skip(skip || 30)
  .limit(limit || 10)
  .sort('name')
  .exec((err, docs) => {
    if (!err) {
      return res.send(docs);
    } else {
      throw err;
    }
  });
}

export function getMonster(req, res) {
  const { id } = req.query;

  Monster.findById(id, (err, monster) => {
    if (!err) {
      return res.send(monster);
    } else {
      throw err;
    }
  });
}
