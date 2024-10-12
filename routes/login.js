const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../models/user")
const wrapAsync = (fn)=>{
    return function(req, res, next){
    Promise.resolve(fn(req, res, next)).catch(next);
    }
  }
router.get("/",wrapAsync((req,res)=>{
    res.render("user-login")
}))

router.post("/", passport.authenticate("user-local", {failureRedirect: '/user-login', failureFlash: true}), (req,res)=>{
    res.redirect("/")
})

router.get("/signup",wrapAsync((req, res)=>{
    res.render("user-creatAcc")
}))

router.post("/signup", async (req,res)=>{
    try{
        let {username, email, password, fname, lname} = req.body
    const newUser = User({username, email, fname, lname})
    await User.register(newUser,password)
    req.login(newUser, (e)=>{
        if(e){
            return next(e)
        }
        res.redirect("/")
    })
}
    catch(e){
        req.flash("error", e.message)
        res.redirect("/user-login/signup")
    }
})

router.get("/signup",wrapAsync((req, res)=>{
    res.redirect("/")
}))

router.get("/logout",wrapAsync((req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
    }) 
    res.redirect("/")
}))

module.exports = router