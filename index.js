const express = require("express");
const path = require("path");
const moment = require("moment");
const mongoose = require("mongoose");

const Recipe = require("./models/recipe");
const Ingredient = require("./models/ingredient");
const Owner = require("./models/owner");
const IngredientAmount = require("./models/ingredientAmount");

const app = express();
app.locals.moment = moment

mongoose.set("strictQuery", false);

const dev_db_url =
	"mongodb+srv://dbUser:kXVops04jV8MTI3s@cluster-meal-recommenda.fjbrt.mongodb.net/recipes?retryWrites=true&w=majority&appName=Cluster-Meal-Recommendation";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

const numeral = require('numeral');
function formatNumber(number) {
	return numeral(number).format('0,0.00');
}

app.locals.formatNumber = formatNumber;
main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
}

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
	const allRecipes = await Recipe.find({}, "name description ingredientAmounts serves preparationTime origin")
		.sort({ name: 1 })
		.populate({
			path: 'ingredientAmounts',
			populate: {
				path: 'ingredient',
				model: 'Ingredient'
			}
		})
		.exec();

	res.render("index", {
		recipes: allRecipes
	});
});

app.get("/recipe/:id", async (req, res, next) => {
	const recipeById = await Recipe.findById(req.params.id)
		.populate({
			path: 'ingredientAmounts',
			populate: {
				path: 'ingredient',
				model: 'Ingredient'
			}
		})
		.populate('owners')
		.exec();

	if (recipeById === null) {
		const err = new Error('Recipe not found');
		err.status = 404;
		return next(err);
	}

	res.render("recipe-detail", {
		recipe: recipeById
	})

});

app.get("/dietary-requirements", async (req, res, next) => {

	res.render("dietary-requirements", {})

});


const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
