const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  expireDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CartOrder", CartSchema);
