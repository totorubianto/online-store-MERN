const mongoose = require('mongoose');

const RegencySchema = new mongoose.Schema({
  city_id: {
    type: Number
  },
  province_id: {
    type: Number
  },
  province: {
    type: String
  },
  type: {
    type: String
  },
  city_name: {
    type: String
  },
  postal_code: {
    type: Number
  }
});

module.exports = Regency = mongoose.model('regency', RegencySchema);
