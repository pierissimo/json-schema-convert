var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var String = mongoose.Schema.Types.String;
var Schema = mongoose.Schema;
/*
module.exports = {
  exampleString: String,
  exampleArray: [{
    bacon: String,
    anotherBacon:{type: 'String'}
  }],
  exampleNested: {
    beer: String,
    anotherBeer:{type: 'String', required: true}
  },
  accountId: {type: ObjectId, required: true, index: true},
  active: {type: Boolean, default: true, index: true},
  name: {type: String, required: true},
  lookup: {type: String},
  description: {type: String, required: true},
  unitCost: {type: Number, required: true, default: 0},
  unitPrice: {type: Number, required: true, default: 0},
  weight: {type: Number, required: true, default: 0},
  code: {type: String, required: true},
  stockLevel: {type: Number, required: true, default: 0},
  requiredLevel: {type: Number, required: true, default: 0},
  barcode: {type: String},
  image: {type: String},
  exampleRefField:{type:ObjectId, ref: 'orders'}
};
*/


module.exports = new Schema({
  exampleString: String,
  exampleArray: [{
    bacon: String,
    anotherBacon:{type: 'String'}
  }],
  exampleNested: {
    beer: String,
    anotherBeer:{type: 'String', required: true}
  },
  accountId: {type: ObjectId, required: true, index: true},
  active: {type: Boolean, default: true, index: true},
  name: {type: String, required: true},
  lookup: {type: String},
  description: {type: String, required: true},
  unitCost: {type: Number, required: true, default: 0},
  unitPrice: {type: Number, required: true, default: 0},
  weight: {type: Number, required: true, default: 0},
  code: {type: String, required: true},
  stockLevel: {type: Number, required: true, default: 0},
  requiredLevel: {type: Number, required: true, default: 0},
  barcode: {type: String},
  image: {type: String},
  exampleRefField:{type:ObjectId, ref: 'orders'}
});
