const mongoose = require('mongoose')

const GenderSchema = new mongoose.Schema({
    desc : String
});

module.exports = Gender = mongoose.model('Gender', GenderSchema);