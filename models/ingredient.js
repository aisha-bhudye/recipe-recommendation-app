const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  category: {
    type: String,
    required: true,
    enum: ["Spice", "Allium", "Vegetable", "Dairy", "Fat", "Fruit", "Gluten", "Carbohydrate", "Chemical", "Fish", "Mammal", "Bird", "Egg", "Nut" ],
    default: "Mammal",
  }
});

// Virtual for this ingredient instance URL.
ingredientSchema.virtual("url").get(function () {
  return "/ingredient/" + this._id;
});

// Export model.
module.exports = mongoose.model("Ingredient", ingredientSchema);
