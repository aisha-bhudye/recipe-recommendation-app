const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IngredientQuantitySchema = new Schema({
  unit: {
    type: String,
    required: true,
    enum: ["tablespoon", "teaspoon", "gramme", "millilitre", "cup"],
    default: "gramme",
  },
  quantity: { type: mongoose.Types.Decimal128, required: true},
  ingredient: { type: Schema.ObjectId, ref: "Ingredient", required: true }
});

// Virtual for this book instance URL.
IngredientQuantitySchema.virtual("url").get(function () {
  return "/catalog/ingredientQuantity/" + this._id;
});

IngredientQuantitySchema.virtual("ingredientstep").get(function () {
  return this.quantity + ' ' + this.unit;
});

// Export model.
module.exports = mongoose.model("IngredientQuantity", IngredientQuantitySchema);
