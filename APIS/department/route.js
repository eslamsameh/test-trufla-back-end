var controller = require("./controller");

function route(app) {
    app.get("/api/department", controller.getDepartments);
    app.post("/api/department", controller.addDepartment);

}

module.exports = route;
