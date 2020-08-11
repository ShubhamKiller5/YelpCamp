var express        = require("express"),
	app            = express(),
	parser         = require("body-parser"),
	mongoose       = require("mongoose"),
	passport       = require("passport"),
	LocalStrategy  = require("passport-local"),
	passportmon    = require("passport-local-mongoose"),
	methodOverride = require("method-override"),
	flash          = require("connect-flash"),
	camps          = require("./models/campground"),
	User           = require("./models/user"),
	comment        = require("./models/comment.js"),
	middleware     = require("./middleware/middleware.js");
	

var indexRoute      = require("./routes/index"),
	campgroundRoute = require("./routes/campground"),
	commentRoute    = require("./routes/comment");


//mongoose configure
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.LOCALDATABASE);


//setting up the express
app.use(parser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//passport configure
app.use(require("express-session")({
	secret : "yeah it's me",
	resave : false,
	saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware to make particular data available to all the templates
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


//routes

app.use(indexRoute);
app.use("/campgrounds",campgroundRoute);
app.use("/campgrounds/:id/comments",commentRoute);



app.listen(process.env.PORT,process.env.IP,function(){
	console.log("server is on");
});