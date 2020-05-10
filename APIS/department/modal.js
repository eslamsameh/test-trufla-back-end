var mongoose = require('mongoose');
var schema = mongoose.Schema;
var departmentSchema = schema({
   name: {type: String, required : true, unique: true},
});
var DepartmentSchema = mongoose.model('departmentModel', departmentSchema);
module.exports = DepartmentSchema;