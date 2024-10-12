const express = require("express");
const router = express.Router();
const packages = require("../models/packages");
const wrapAsync = (fn)=>{
  return function(req, res, next){
    fn(req,res,next).catch(next)
  }
}
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please log in first");
    return res.redirect("/user-login");
  }
  next();
};

router.get("/", isLoggedIn,wrapAsync( (req, res) => {
  if (req.user.verified) {
    res.render("new");
  } else {
    req.flash("error", "You don't have the permission")
    res.redirect("/");
  }
}))

router.post("/", isLoggedIn,wrapAsync( async (req, res) => {
  try {
    if (req.user.verified) {
      let { from, description, destination, price, image, duration } = req.body;
      let inclusions = req.body.inclusions;
      inclusions = inclusions.split(",");
      let exclusions = req.body.exclusions;
      exclusions = exclusions.split(",");
      let placesIncludes = req.body.placesIncludes;
      placesIncludes = placesIncludes.split(",");
      const newData = new packages({
        from,
        destination,
        price,
        description,
        inclusions,
        exclusions,
        placesIncludes,
        image,
        owner: req.user._id,
        duration,
      });
      newData.save();
      res.redirect("/");
    }else{req.flash("error", "You don't have the permission")
    res.redirect("/");}
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/new");
  }
}));

module.exports = router;
