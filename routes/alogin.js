const express = require("express")
const router = express.Router()
const passport = require("passport")
const agent = require("../models/agent")
const wrapAsync = (fn)=>{
    return function(req, res, next){
        Promise.resolve(fn(req, res, next)).catch(next);
    }
  }
router.get("/",wrapAsync((req, res)=>{
    res.render("agent-login")
}))

router.post("/", passport.authenticate("agent-local", {failureRedirect: '/agent-login', failureFlash: true}), (req, res)=>{
    res.redirect("/")
})

router.get("/signup",wrapAsync((req,res)=>{
    res.render("agent-signup")
}))

router.post("/signup",async (req, res)=>{
    try{let {name,username, password, agencyName, email, phone, address,state,country,licenseNumber,licenseDocument, instagram} = req.body
    const newagent = agent({name,username, agencyName, email, phone, address,state,country,licenseNumber,licenseDocument, instagram})
    await agent.register(newagent,password)
    req.login(newagent, (e)=>{
        if(e){
            return next(e)
        }
        req.flash("success", "You will recieve an email as soon as our team verifies you authenticity.")
        res.redirect("/")
    })
}
    catch(e){
        req.flash("error", e.message)
        res.redirect("/agent-login/signup")
    }
})

module.exports = router