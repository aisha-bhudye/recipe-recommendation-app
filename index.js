const express = require("express");
const path = require("path");
const moment = require("moment");
const mongoose = require("mongoose");
const numeral = require('numeral');
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

function formatNumber(number) {
	return numeral(number).format('0,0.00');
}

app.locals.formatNumber = formatNumber;
main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

app.get("/", async (req, res) => {
	//When a request comes in at /, retrieve all the recipes from MongoDB via mongoose and then hand over to index.pug for rendering
	const allRecipes = await Recipe.find({}, 
		"name description ingredientAmounts serves preparationTime origin isGlutenFree isNutFree isVegan isVegetarian")
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
	//When a request comes in at /recipe/:id where id is the MongoDB id of the recipe object, retrieve recipe that matches this id from MongoDB via mongoose 
	//and then hand over to recipe-detail.pug for rendering
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
	//When a request comes in at /dietary-requirements, then hand over to dietary-requirements.pug to render the form
	res.render("dietary-requirements", {})
});

app.post("/dietary-requirements", async (req, res, next) => {

	const firstName = req.body.firstName;

	let queryCriteria = {}; //Start off with none of dietary requirement set i.e. not set to either true or false
	if (req.body.glutenIntolerance != "dontmind"){
		queryCriteria.isGlutenFree = req.body.glutenIntolerance;
	}
	if (req.body.nutAllergy  != "dontmind"){
		queryCriteria.isNutFree =  req.body.nutAllergy;
	}
	if (req.body.vegetarian  != "dontmind"){
		queryCriteria.isVegetarian = req.body.vegetarian;
	}
	if (req.body.vegan  != "dontmind"){
		queryCriteria.isVegan = req.body.vegan;
	}

	const suitableRecipes = await Recipe.find(queryCriteria,
		"name description ingredientAmounts serves preparationTime origin isGlutenFree isNutFree isVegan isVegetarian")
		.sort({ name: 1 })
		.populate({
			path: 'ingredientAmounts',
			populate: {
				path: 'ingredient',
				model: 'Ingredient'
			}
		})
		.exec();

	res.render("suitable-recipes", {
		recipes: suitableRecipes,
		firstName: firstName
	});

});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
