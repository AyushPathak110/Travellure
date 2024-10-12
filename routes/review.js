const express = require("express")
const router = express.Router({mergeParams: true})
const review = require("../models/review")
const package = require("../models/packages")
const wrapAsync = (fn)=>{
    return function(req, res, next){
      fn(req,res,next).catch(next)
    }
  }
const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
      req.flash("error", "Please log in first")
      return res.redirect("/user-login")
    }next()
  }

router.post("/:id",isLoggedIn,wrapAsync(async (req, res)=>{
    const id = req.params.id
    const thisOne = new review({
        owner: req.user.id,
        rating: req.body.rating,
        comment: req.body.comment,
        username: req.user.username
    })
    await thisOne.save()
    const dataPack = await package.findById(id)
    dataPack.review.push(thisOne.id)
    dataPack.save()
    res.redirect(`/show/${id}`)
}))

router.delete("/:pid/:id",isLoggedIn,wrapAsync( async(req, res)=>{
    const id = req.params.id
    const pid = req.params.pid
    const thisOne = await review.findById(id)
    console.log(thisOne.owner)
    console.log(req.user._id)
    if(req.user._id == thisOne.owner.toString()){
    await package.findByIdAndUpdate(pid, {$pull: {review: id}})
    await review.findByIdAndDelete(id)
    return res.redirect(`/show/${pid}`)}
    else{
        req.flash("error", "You don't permission to do this.")
        res.redirect(`/show/${pid}`)
    }
}))

module.exports = router