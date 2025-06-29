const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.signupForm = async (req, res)=>{
    try{
        let {email, username, password} = req.body;
    let newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", " Registration successful. Welcome to Havenly! ");
        res.redirect("/listings");
    })
    
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup")
    }
}

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs")
}

module.exports.loginForm = async(req, res)=>{
    req.flash("success", "Welcome back to Havenly");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if (err){
             return next(err)
        }
        req.flash("success", "You are logged out!")
        res.redirect("/listings")
    })
}