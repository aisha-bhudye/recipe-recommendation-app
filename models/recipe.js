const mongoose = require("mongoose");
const { DateTime } = require("luxon"); //for date handling

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 300 },
    ingredients: [{ type: Schema.ObjectId, ref: "IngredientQuantity", required: true }],
    steps: [{ type: String, required: true }],
    serves: { type: Number, required: true },
    preparationTime: { type: Number, required: true },
    origin:{
        type: String,
        required: true,
        enum: ["British", "Indian", "Persian", "African", "Latino", "Chinese", "Japanese", "Italian", "French", "Mediterranean"],
        default: "British",
      },
	owners: [{ type: Schema.ObjectId, ref: "Owner", required: true }]
});

RecipeSchema.set('timestamps', true);

// Virtual for this recipe object's URL.
RecipeSchema.virtual("url").get(function () {
    return "/recipe/" + this._id;
});


// Export model.
module.exports = mongoose.model("Recipe", RecipeSchema);
