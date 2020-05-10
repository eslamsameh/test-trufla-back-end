var mongoose = require('mongoose');
function openDbConnection() {
    mongoose.connect('mongodb://EslamSameh:Asd123@ds161336.mlab.com:61336/test-trufla',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
}
module.exports = openDbConnection;