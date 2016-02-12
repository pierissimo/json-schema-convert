var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
  code: 			{type:String, required:true},
  service: 		{type:String, required:true},
  alias: 			{type:String},
  serviceId:		{type:ObjectId}
};