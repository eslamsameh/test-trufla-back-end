var modal = require("./modal");
const controller = {

    getDepartments: (req, resp) => {
        modal.find().lean().then((departments) => {
            resp.status(200).send({ success: true, departments: departments })
        }).catch((err) => {
            resp.status(400).send({ success: false, message: err.message || "No Department" });
        });
    },
    addDepartment: (req, resp) => {
        const departmentInsertion = new modal({
            name: req.body.name,
        });
        departmentInsertion.save().then((Res) => {
            resp.status(200).send({ success: true, message: "Successfully Added" })
        }).catch((err) => {
            resp.status(400).send({ success: false, message: err.message || "No Department" });
        })
    }
};
module.exports = controller;
