const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    phoneNumber: {type: Number, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});
userSchema.set('collection','Users');
module.exports = mongoose.model('Users', userSchema);