const mongoose = require('mongoose')

const ConditionSchema = new mongoose.Schema({
    desc : String
});

module.exports = Condition = mongoose.model('condition', ConditionSchema);