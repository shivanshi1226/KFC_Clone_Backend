const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    image: String,
    title: String,
    desc: String,
    price: String,
    type: String
});

const menuModel = mongoose.model('menu', menuSchema);

module.exports = menuModel;
