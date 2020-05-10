var modal = require("./modal");
const controller = {
    getPromotions: (req, resp) => {
        modal.find().populate("department").lean().then((promotions) => {
            resp.status(200).send({ success: true, promotions: promotions })
        }).catch((err) => {
            resp.status(400).send({ success: false, message: err.message || "No Promotions" });
        });
    },
    addPromotion: (req, resp) => {
        const promotionInsertion = new modal({
            code: req.body.code,
            active: req.body.active,
            discount: req.body.discount,
        });
        promotionInsertion.save().then((Res) => {
            resp.status(200).send({ success: true, message: "Successfully Added" })
        }).catch((err) => {
            resp.status(400).send({ success: false, message: err.message || "No Promotions" });
        })
    }
};
module.exports = controller;
