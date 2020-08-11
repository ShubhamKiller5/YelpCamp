var middleware = {};

middleware.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated())
		{
			next();
		}
	else{
		req.session.redirectTo = req.originalUrl;
		res.redirect("/login");
	}
}

module.exports = middleware;