const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/},
    numberOfPeople: { type: Number, required: true },
  },
  package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
  },
  travelDates: {
    startDate: { type: Date, required: true },
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled"],
    default: "pending",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
