var controller = require("./controller");

function route(app) {
    app.get("/api/promotions", controller.getPromotions);
    app.post("/api/promotions", controller.addPromotion);

}

module.exports = route;
