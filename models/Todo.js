const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema ({
    name : {
        type: String,
        require : true
    }
})

module.exports = mongoose.model('Todo', TodoSchema);