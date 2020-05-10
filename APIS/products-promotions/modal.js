var mongoose = require('mongoose');
var schema = mongoose.Schema;
var productPromotionsSchema = schema({
    promotion: {type: schema.Types.ObjectId, ref: "promotionsModel", required: true},
    product: {type: schema.Types.ObjectId, ref: "productModel", required: true},
});
var ProductPromotionsSchema = mongoose.model('productPromotionsModel', productPromotionsSchema);
module.exports = ProductPromotionsSchema;