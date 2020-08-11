var mongoose = require("mongoose"),
	passportmon  = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username : String,
	password : String
});

userSchema.plugin(passportmon);

module.exports = mongoose.model("user",userSchema);
