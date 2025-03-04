const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingredientAmountSchema = new Schema({
  unit: {
    type: String,
    required: true,
    enum: ["tablespoon", "teaspoon", "gramme", "millilitre", "cup", "piece"],
    default: "gramme",
  },
  quantity: { type: mongoose.Types.Decimal128, required: true},
  ingredient: { type: Schema.ObjectId, ref: "Ingredient", required: true }
});

// Virtual for this book instance URL.
ingredientAmountSchema.virtual("url").get(function () {
  return "/ingredientAmount/" + this._id;
});

ingredientAmountSchema.virtual("ingredientAmountStep").get(function () {
  return this.quantity + ' ' + this.unit;
});

// Export model.
module.exports = mongoose.model("IngredientAmount", ingredientAmountSchema);
