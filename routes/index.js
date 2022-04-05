var express  = require("express"),
    router   = express.Router(),
	passport = require("passport"),
	User     = require("../models/user");


router.get("/",function(req,res){
	res.render("landing");
});

router.get("/register",function(req,res){
	res.render("register");
});

router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,done){
		if(err){
			req.flash("error",err.message);
			return res.render("register");
		}
		else{
			passport.authenticate("local")(req,res,function(){
				req.flash("success","Welcome to YelpCamp "+ done.username);
				res.redirect(req.session.redirectTo || "/campgrounds");
				delete req.session.redirectTo;
			})
		}
	});
});

router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login",passport.authenticate("local",{
	failureRedirect : "/login",
	failureFlash : {
		type : "error",
		message : "Invalid Username or Password"
	}
}),function(req,res){
	req.flash("success","Welcome To YelpCamp "+ req.user.username);
	res.redirect(req.session.redirectTo || "/campgrounds");
	delete req.session.redirectTo;
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged You Out");
	res.redirect("/campgrounds");
});

module.exports = router;