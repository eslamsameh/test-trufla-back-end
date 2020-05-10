var mongoose = require('mongoose');
var schema = mongoose.Schema;
var promotionSchema = schema({
    code: {type: String, required : true},
    active: Boolean,
    discount: Number
});
var PromotionSchema = mongoose.model('promotionsModel', promotionSchema);
module.exports = PromotionSchema;