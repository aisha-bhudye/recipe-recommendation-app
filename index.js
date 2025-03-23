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
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


//getting the recipes to display to the user 
app.get("/", async (req, res) => {
    console.log("Received request to / with query:", req.query);

    let queryCriteria = {};  

    // Check if a cuisine filter is provided in the query params
    if (req.query.cuisine && req.query.cuisine !== "") {
        queryCriteria.origin = req.query.cuisine;
        console.log("Filtering by cuisine:", req.query.cuisine);
    }

    try {
        // Fetch recipes based on filter criteria
        const recipes = await Recipe.find(queryCriteria,
            "name description ingredientAmounts serves preparationTime origin isGlutenFree isNutFree isVegan isVegetarian"
        )
        .sort({ name: 1 })
        .populate({
            path: 'ingredientAmounts',
            populate: {
                path: 'ingredient',
                model: 'Ingredient'
            }
        })
        .exec();

        console.log("Recipes found:", recipes.length);

        res.render("index", {
            recipes: recipes,
            selectedCuisine: req.query.cuisine || "" // Pass selected cuisine back to the template
        });
    } catch (err) {
        console.error("Error fetching recipes:", err);
        res.status(500).send("Error retrieving recipes.");
    }
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
    if (req.body.glutenIntolerance === "true"){
        queryCriteria.isGlutenFree = req.body.glutenIntolerance;
    }else if (req.body.glutenIntolerance === "false"){
        queryCriteria.isGlutenFree = {$in: [true,false]};
    }
    if (req.body.nutAllergy === "true"){
        queryCriteria.isNutFree =  req.body.nutAllergy;
    }else if (req.body.nutAllergy === "false"){
        queryCriteria.isNutFree = {$in: [true,false]};
    }
    if (req.body.vegetarian === "true"){
        queryCriteria.isVegetarian = req.body.vegetarian;
    }else if (req.body.vegetarian === "false"){
        queryCriteria.isVegetarian = {$in: [true,false]};
    }
    if (req.body.vegan === "true"){
        queryCriteria.isVegan = req.body.vegan;
    }else if (req.body.vegan === "false"){
        queryCriteria.isVegan = {$in: [true,false]};
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
