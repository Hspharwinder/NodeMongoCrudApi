const mongoose = require('mongoose');
require("dotenv/config");
const url = path; //process.env.MONGOURL;
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    console.log(url);
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./book.model');
