const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  class: {
    type: String,
    required: true,
    enum: ["Spice", "Allium", "Vegetable", "Dairy", "Fat", "Fruit", "Gluten", "Carbohydrate", "Chemical", "Fish", "Mammal", "Bird", "Oil", "Sauce" ],
    default: "Mammal",
  }
});

// Virtual for this ingredient instance URL.
IngredientSchema.virtual("url").get(function () {
  return "/ingredient/" + this._id;
});

// Export model.
module.exports = mongoose.model("Ingredient", IngredientSchema);
