#! /usr/bin/env node

console.log(
    'This script populates some test recipes to your database. Specified database as argument - e.g.: node populate-recipe-db "mongodb+srv://dbUser:t6o78zpgIXXgtfcs@cluster-play.hg7k5.mongodb.net/meals?retryWrites=true&w=majority&appName=Cluster-Play"'
); //TODO: Update this prompt

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Ingredient = require("../models/ingredient");
const Owner = require("../models/owner");
const IngredientQuantity = require("../models/ingredientQuantity");
const Recipe = require("../models/recipe");

const ingredients = [];
const owners = [];
const ingredientQuantities = [];
const recipes = [];

const mongoose = require("mongoose");
const owner = require("../models/owner");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Connected successfully!");

    await Ingredient.deleteMany();
    await Owner.deleteMany();
    await IngredientQuantity.deleteMany();
    await Recipe.deleteMany();
    console.log("Debug: Emptied all collections");

    await createListOfIngredients();
    await createListOfOwners();
    await createListOfIngredientQuantities();
    await createListOfRecipes();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

/**
 * The same sequence of operations is used for every create method; the comments in this method will be similar to the other methods
 * @param {*} indexParam 
 * @param {*} nameParam 
 * @param {*} classParam 
 * @param {*} dietaryAdviceParam 
 */
async function createIngredient(indexParam, nameParam, classParam, dietaryAdviceParam) {
    //Create a JavaScript object with the arguments that have just come in via the parameters
    const ingredientObject = {
        name: nameParam,
        class: classParam
    };

    //Create an object using our Moongoose model
    const ingredient = new Ingredient(ingredientObject)

    //Ask mongoose to save the ingredient to MongoDB and wait for the operation to complete before moving to the next statement
    await ingredient.save();

    //Insert the ingredient that has been successfully saved into the position indicated by indexParam
    ingredients[indexParam] = ingredient;

    //Log the ingredient to the console as a feedback of successful completion
    console.log(`Added ingredient ${JSON.stringify(ingredientObject)}`);
}

async function createOwner(indexParam, firstNameParam, familyNameParam, dateOfBirthParam, biographyParam) {
    const ownerObject = {
        firstName: firstNameParam,
        familyName: familyNameParam,
        dateOfBirth: dateOfBirthParam,
        biography: biographyParam
    }
    const owner = new Owner(ownerObject);
    await owner.save();
    owners[indexParam] = owner;
    console.log(`Added owner ${JSON.stringify(ownerObject)}`);

}

async function createIngredientQuantity(indexParam, unitParam, quantityParam, ingredientParam) {
    const ingredientQuantityObject = {
        unit: unitParam,
        quantity: quantityParam,
        ingredient: ingredientParam
    }
    const ingredientQuantity = new IngredientQuantity(ingredientQuantityObject);
    await ingredientQuantity.save();
    ingredientQuantities[indexParam] = ingredientQuantity;
    console.log(`Added ingredientQuantity ${JSON.stringify(ingredientQuantityObject)}`);

}

async function createRecipe(indexParam, nameParam, descriptionParam, ingredientsParam, stepsParam, servesParam, preparationTimeParam, originParam, ownerParam) {
    const recipeObject = {
        name: nameParam,
        description: descriptionParam,
        ingredients: ingredientsParam,
        steps: stepsParam,
        serves: servesParam,
        preparationTime: preparationTimeParam,
        origin: originParam, 
		owners: ownerParam
    }
    const recipe = new Recipe(recipeObject);
    await recipe.save();
    recipes[indexParam] = recipe;
    console.log(`Added recipe ${JSON.stringify(recipeObject)}`);

}

async function createListOfIngredients() {
    console.log("Adding ingredients");
    await Promise.all([
        createIngredient(0, "Salt", "Chemical", ),
        createIngredient(1, "Briani mix", "Spice"),
        createIngredient(2, "Onion", "Allium"),
        createIngredient(3, "Plain Yoghurt", "Dairy"),
        createIngredient(4, "Chicken", "Bird"),
        createIngredient(5, "Potato", "Carbohydrate"),
        createIngredient(6, "Rice", "Carbohydrate"),
    ]);
    
}

async function createListOfOwners() {
    console.log("Adding owners");
    await Promise.all([
        createOwner(0,"Aisha", "Bhudye", "01/01/2003", "Aisha was born in Newham to African Asian parents")
    ]);
    
}

async function createListOfIngredientQuantities() {
    console.log("Adding ingredients");
    await Promise.all([
        createIngredientQuantity(0, 'teaspoon', 2.0, ingredients[0]),
        createIngredientQuantity(1, 'tablespoon', 5.0, ingredients[1]),
        createIngredientQuantity(2, 'gramme', 1000.0, ingredients[2]),
        createIngredientQuantity(3, 'cup', 2.0, ingredients[3]),
        createIngredientQuantity(4, 'gramme', 2000.0, ingredients[4]),
        createIngredientQuantity(5, 'gramme', 2000.0, ingredients[5]),
        createIngredientQuantity(6, 'gramme', 2000.0, ingredients[6]),
    ]);
    
}

async function createListOfRecipes() {
    console.log("Adding recipes");

    const kaliaIngredientQuantities = [
        ingredientQuantities[0],
        ingredientQuantities[1],
        ingredientQuantities[2],
        ingredientQuantities[3],
        ingredientQuantities[4],
        ingredientQuantities[5],
    ]
    const kaliaSteps = [
        "Soak the protein source of your choice overnight with the spices, the yoghurt and the salt",
        "Cut the potatoes into quarters and deep fry them until they develop a golden coat",
        "Slice the onions and deep fry them until they develop a golden coat",
        "Add the fried potatoes and the fried onions to the mix",
        "Bring to boil and then allow to simmer for about 30 mins, adding water to bring the broth to a consistency to your taste"
    ]
    await Promise.all([
        createRecipe(0,"Kalia", "This is an Asian broth that is typically made using chicken or beef", kaliaIngredientQuantities, kaliaSteps, 5, 60, "Indian", owners)
    ]);


    const brianiIngredientQuantities = [
        ingredientQuantities[0],
        ingredientQuantities[1],
        ingredientQuantities[2],
        ingredientQuantities[3],
        ingredientQuantities[4],
        ingredientQuantities[5],
        ingredientQuantities[6]
    ]
    const brianiSteps = [
        "Soak the protein source of your choice overnight with the spices, the yoghurt and the salt",
        "Cut the potatoes into quarters and deep fry them until they develop a golden coat",
        "Slice the onions and deep fry them until they develop a golden coat",
        "Add the fried potatoes and the fried onions to the mix",
        "Layer the rice on top of the mix, placing some of the fried onions in between the layers",
        "Seal the recipient with aluminium foil underneath its cover",
        "Cook on highest fire for 10 mins and then on low fire for another 40 mins"
    ]
    await Promise.all([
        createRecipe(1,"Briani", "This is an Asian rice mix with potato, typically made using chicken or beef", brianiIngredientQuantities, brianiSteps, 5, 60, "Indian", owners)
    ]);


}
