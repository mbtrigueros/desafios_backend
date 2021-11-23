const mongoose = require("mongoose");
require('mongoose-type-email');

const Schema = mongoose.Schema;

const usersCollection = 'users';

const UserSchema = new Schema({
    email: { type: mongoose.SchemaTypes.Email, required: true },
    name: { type: String, required: true, max: [30, "Max length is 30 characters"] },
    password: { type: String, required: true }
});


module.exports = mongoose.model(usersCollection, UserSchema);