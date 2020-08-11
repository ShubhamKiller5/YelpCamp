var mongoose = require("mongoose");

var campSchema = new mongoose.Schema({
	title : String,
	image : String,
	description: String,
	author : {
		id:{
			type : mongoose.Schema.Types.ObjectId,
			ref : "user"
		},
		username:String
	},
	comment : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "comment"
		}
	]
});

module.exports = mongoose.model("campground",campSchema);