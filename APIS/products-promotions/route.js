var controller = require("./controller");

function route(app) {
    app.get("/api/products-promotions", controller.getProductsPromotions);
    app.post("/api/products-promotions", controller.addProductsPromotion);

}

module.exports = route;
