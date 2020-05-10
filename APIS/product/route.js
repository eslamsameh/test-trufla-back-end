var controller = require("./controller");

function route(app) {
    app.get("/api/products", controller.getProducts);
    app.post("/api/products", controller.saveProduct);

    app.get("/api/countOfProducts", controller.getCountOfProduct);

}

module.exports = route;
