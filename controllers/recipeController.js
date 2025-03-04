const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");
const Owner = require("../models/owner");
const IngredientAmount = require("../models/ingredientAmount");


const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");



// Display list of all recipes.
exports.recipes_list = asyncHandler(async (req, res, next) => {
  const allRecipes = await Recipe.find({}, "name description ingredientAmounts")
    .sort({ name: 1 })
    .populate("ingredientAmounts")
    .exec();

  res.render("recipe_list", { title: "Recipe List", recipe_list: allRecipes });
});

