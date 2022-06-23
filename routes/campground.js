var express    = require("express"),
    router     = express.Router(),
    comment    = require("../models/comment"),
	camps      = require("../models/campground"),
	middleware = require("../middleware/middleware");


//show all campgrounds
router.get("/",function(req,res){
	camps.find({},function(err,camp){
		if(err) console.log(err);
		else
			res.render("index",{campground:camp});
	});
});

//GET a form for new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("new");
});

//Post a new campground
router.post("/",function(req,res){
	var newCamp = {
		title : req.body.title,
		image : req.body.image,
		author : {
			id:req.user._id,
			username:req.user.username
		},
		description : req.body.description
	}
	let date = new Date();
	newCamp.lastUpdated = JSON.stringify(date);
	camps.create(newCamp,function(err,done){
		if(err) console.log(err);
		else{
			res.redirect("/campgrounds");
		}
	});
});

//GET campground by id
router.get("/:id",function(req,res){
	camps.findById(req.params.id).populate("comment").exec(function(err,found){
		if(err) console.log(err);
		else{
			res.render("show",{campground:found});
		}
	});
});

//GET the update form
router.get("/:id/update",middleware.isLoggedIn,function(req,res){
	camps.findById(req.params.id,function(err,found){
		if(err) console.log(err);
		else
			res.render("update",{campground:found});	
	});
});

//Update campground
router.post("/:id",function(req,res){
	let date = new Date();
	req.body.edit.lastUpdated = JSON.stringify(date);
	camps.findByIdAndUpdate(req.params.id,req.body.edit,function(err,done){
		if(err) console.log(err);
		else 
			res.redirect("/campgrounds/"+req.params.id);
	})
});

//DELETE campground
router.delete("/:id",function(req,res){
	camps.findByIdAndDelete(req.params.id,function(err,done){
		if(err) console.log(err);
		else
			res.redirect("/campgrounds");
	});
});

module.exports = router;