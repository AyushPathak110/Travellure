const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        min: 1,
        max: 5,
        require: true
    },
    comment:{
        type: String,
        require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    username: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("reviews", reviewSchema)