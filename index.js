const express = require("express");
const app = express();
const path = require("path");

const Recipe = require("./models/recipe");
const Ingredient = require("./models/ingredient");
const Owner = require("./models/owner");
const IngredientQuantity = require("./models/ingredientQuantity");

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dev_db_url =
  "mongodb+srv://dbUser:t6o78zpgIXXgtfcs@cluster-play.hg7k5.mongodb.net/recipes?retryWrites=true&w=majority&appName=Cluster-Play";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
	  const allRecipes = await Recipe.find({}, "name description ingredients serves preparationTime origin")
        .sort({ name: 1 })
        .populate("ingredients")
        .exec();

	res.render("index", { recipes: allRecipes });
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
