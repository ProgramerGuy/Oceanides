/* The above code is creating a schema for the token collection. */
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {type:String}
});

module.exports = mongoose.model('Token', tokenSchema);