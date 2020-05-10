var modal = require("./modal");
const controller = {
    getProductsPromotions: (req, resp) => {
        modal.find().populate("department").lean().then((productsPromotions) => {
            resp.status(200).send({ success: true, productsPromotions: productsPromotions })
        }).catch((err) => {
            resp.status(400).send({ success: false, message: err.message || "No Products Promotions" });
        });
    },
    addProductsPromotion: (req, resp) => {
        const promotionInsertion = new modal({
            promotion: req.body.promotion,
            product: req.body.product,
        });
        promotionInsertion.save().then((Res) => {
            resp.status(200).send({ success: true, message: "Successfully Added" })
        }).catch((err) => {
            resp.status(400).send({ success: false, message: err.message || "No Promotions" });
        })
    }
};
module.exports = controller;
