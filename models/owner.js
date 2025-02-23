const mongoose = require("mongoose");
const { DateTime } = require("luxon"); // for date handling

const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 100 },
  familyName: { type: String, required: true, maxLength: 100 },
  dateOfBirth: { type: Date },
  biography: { type: String, required: true, maxLength: 300 }
});

// Virtual for author "full" name.
OwnerSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.familyName;
});

// Virtual for this owner instance URL.
OwnerSchema.virtual("url").get(function () {
  return "/owner/" + this._id;
});


OwnerSchema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); // format 'YYYY-MM-DD'
});

// Export model.
module.exports = mongoose.model("Owner", OwnerSchema);
