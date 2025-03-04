const mongoose = require("mongoose");
const { isVegetarian, isGlutenFree } = require("../logic/categorize-recipe");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
	name: { type: String, required: true, maxLength: 100 },
	description: { type: String, required: true, maxLength: 300 },
	ingredientAmounts: [{ type: Schema.ObjectId, ref: "IngredientAmount", required: true }],
	steps: [{ type: String, required: true }],
	serves: { type: Number, required: true },
	preparationTime: { type: Number, required: true },
	origin: {
		type: String,
		required: true,
		enum: ["British", "Indian", "Persian", "African", "Latino", "Chinese", "Japanese", "Italian", "French", "Mediterranean"],
		default: "British",
	},
	owners: [{ type: Schema.ObjectId, ref: "Owner", required: true }],
	isGlutenFree: {type: Boolean, required: true},
	isNutFree: {type: Boolean, required: true},
	isVegetarian: {type: Boolean, required: true},
	isVegan: {type: Boolean, required: true}
});

recipeSchema.set('timestamps', true);

// Virtual for this recipe object's URL.
recipeSchema.virtual("url").get(function () {
	return "/recipe/" + this._id;
});

// Export model.
module.exports = mongoose.model("Recipe", recipeSchema);
