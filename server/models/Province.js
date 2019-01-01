const mongoose = require('mongoose');

const ProvinceSchema = new mongoose.Schema({
  province_id: {
    type: Number
  },
  province: {
    type: String
  }
});

module.exports = Province = mongoose.model('province', ProvinceSchema);
