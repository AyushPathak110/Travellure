const mongoose = require('mongoose');
const review = require('./review');

const packagesSchema = mongoose.Schema({
    from:{
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inclusions: {
        type: [String],
        required: true
    },
    exclusions: {
        type: [String],
        required: true
    },
    bestTimeToVisit: {
        type: String,
        required: false
    },
    bestSeason: {
        type: String,
        required: false
    },
    placesIncludes: {
        type: [String],
        required: true
    },
    trending: {
        type: Boolean,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews"
    }]
});

packagesSchema.post("findOneAndDelete", async (package)=>{
    if (package) {
    await review.deleteMany({_id: {$in: package.review}})  
    }
    next()
})

const Package = mongoose.model('Package', packagesSchema);

module.exports = Package;
