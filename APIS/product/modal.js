var mongoose = require('mongoose');
var schema = mongoose.Schema;
var productSchema = schema({
   name: {type: String, required : true, unique: true},
   price: {type: Number, required : true},
   department: {type: schema.Types.ObjectId, ref: "departmentModel", required: true},
});
var ProductSchema = mongoose.model('productModel', productSchema);
module.exports = ProductSchema;