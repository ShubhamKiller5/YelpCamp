var express = require("express"),
    router  = express.Router({mergeParams:true}),
    comment = require("../models/comment"),
	camps   = require("../models/campground"),
	middleware = require("../middleware/middleware");


//comment routes
//ADD a new comment
router.get("/add",middleware.isLoggedIn,function(req,res){
	camps.findById(req.params.id,function(err,found){
		if(err) console.log(err);
		else
			res.render("comment/new",{campground:found});
	});
});

//POST a comment
router.post("/",middleware.isLoggedIn,function(req,res){
	var newCom = {
		text : req.body.comm,
		author : {
			id : req.user._id,
			username : req.user.username
		}
	}
	camps.findById(req.params.id,function(err,found){
		if(err) console.log(err);
		else{
			comment.create(newCom,function(err,done){
				if(err) console.log(err);
				else{
					found.comment.push(done);
					found.save();
					res.redirect("/campgrounds/"+found._id);
				}
			});
		}
	});
});

//Remove comment
router.delete("/:commentid",function(req,res){
	comment.findByIdAndDelete(req.params.commentid,function(err,done){
		if(err) console.log(err);
		else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;