var Schema        = require('mongoose').Schema,
    carrierSchema = require("./boxCarrier"),
    ObjectId      = Schema.Types.ObjectId,
    Mixed         = Schema.Types.ObjectId;

module.exports = {
  accountId: {type: ObjectId, required: true, index: true},
  wallId: {type: ObjectId, ref: 'walls', index: true},
  number: {type: Number, required: true},
  qIndex: {type: Number},
  carrier: carrierSchema,
  shipmentId: {type: ObjectId, ref: 'shipments', index: true},
  sourceOrderId: {type: String},
  orderId: {type: ObjectId, ref: 'orders'},
  itemId: {type: ObjectId},
  status: {type: String, required: true},
  clientName: {type: String},
  itemBarcode: {type: String},
  itemCount: {type: Number},
  expectedItemCount: {type: Number, default: 1},
  componentCount: {type: Number},
  expectedComponentCount: {type: Number, default: 1},
  boxType: {type: String, default: 'job'},
  items: [
    {type: ObjectId}
  ],
  itemDetails: [
    {type: Mixed}
  ],
  products: [{
    componentId: {type: ObjectId},
    itemId: {type: ObjectId},
    quantity: {type: Number, required: true, default: 1},
    expectedQuantity: {type: Number, required: true, default: 1},
    barcode: {type: String},
    sku: {type: String},
    dispatchAlert: {type: String}
  }],
  assemble: [{
    componentId: {type: ObjectId},
    qIndex: {type: Number},
    scanned: {type: Number},
    barcode: {type: String},
  }]
};