const mongoose = require("mongoose");
require('mongoose-type-email');

const Schema = mongoose.Schema;

const usersCollection = 'users';

const UserSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: mongoose.SchemaTypes.Email, required: true },
    picture: { type: String, required: true },
    facebook: { type: String, required: true }
});


module.exports = mongoose.model(usersCollection, UserSchema);