#! /usr/bin/env node

console.log(
    'This script populates some test recipes to your database. Specified database as argument - e.g.: node populate-recipe-db "mongodb+srv://dbUser:kXVops04jV8MTI3s@cluster-meal-recommenda.fjbrt.mongodb.net/recipes?retryWrites=true&w=majority&appName=Cluster-Meal-Recommendation"'
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
        createIngredient(0, "Salt", "Chemical",),
        createIngredient(1, "Briani mix", "Spice"),
        createIngredient(2, "Onion", "Allium"),
        createIngredient(3, "Plain Yoghurt", "Dairy"),
        createIngredient(4, "Chicken", "Bird"),
        createIngredient(5, "Potato", "Carbohydrate"),
        createIngredient(6, "Rice", "Carbohydrate"),
        createIngredient(7, "Chickpeas", "Carbohydrate"),
        createIngredient(8, "Avocado", "Fruit"),
        createIngredient(9, "Red Onion", "Vegetable"),
        createIngredient(10, "Cucumber", "Vegetable"),
        createIngredient(11, "Olive Oil", "Oil"),
        createIngredient(12, "Lemon", "Fruit"),
        createIngredient(13, "Salt", "Chemical"),
        createIngredient(14, "Pepper", "Chemical"),
        createIngredient(15, "Sweet Potato", "Vegetable"),
        createIngredient(16, "Black Beans", "Vegetable"),
        createIngredient(17, "Chili Powder", "Vegetable"),
        createIngredient(18, "Cumin", "Spice"),
        createIngredient(19, "Olive Oil", "Oil"),
        createIngredient(20, "Tortillas", "Carbohydrate"),
        createIngredient(21, "Avocado&Salsa for Topping", "Vegetable"),
        createIngredient(22, "Pasta", "Carbohydrate"),
        createIngredient(23, "Pesto", "Sauce"),
        createIngredient(24, "Parmesan Cheese", "Dairy"),

        createIngredient(25, "Salmon", "Fish" ),
        createIngredient(26, "Honey", "Sauce"),
        createIngredient(27, "Soy Sauce", "Sauce"),
        createIngredient(28, "Chilli Flakes", "Chemical"),
        createIngredient(29, "Broccoli", "Vegetable"),
        createIngredient(30, "Garlic", "Vegetable"),
        //fruit salad//
        createIngredient(31, "Apple", "Fruit"),
        createIngredient(32, "Grapes", "Fruit"),
        createIngredient(33, "Banana", "Fruit"),
        createIngredient(34, "Lemon Juice", "Sauce"),
        createIngredient(35, "Chia Seeds", "Fruit"),
        createIngredient(36, "Kiwi", "Fruit"),
        createIngredient(37, "Pomegranate", "Fruit"),

        //shrimp rice//
        createIngredient(38, "Shrimp", "Fish"),
        createIngredient(39, "Butter", "Dairy"),
        createIngredient(40, "Garlic", "Vegetable"),
        createIngredient(41, "Lemon Juice", "Sauce"),
        createIngredient(42, "Spring Onion", "Vegetable"),
        createIngredient(43, "Paprika", "Chemical"),



    ]);

}

async function createListOfOwners() {
    console.log("Adding owners");
    await Promise.all([
        createOwner(0, "Aisha", "Bhudye", "01/01/2003", "Aisha was born in Newham to African Asian parents"),
        createOwner(1, "Alexis", "Xavier", "02/02/2003", "Alexis was born to parents from lovely Portugal")
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
        createIngredientQuantity(7, 'gramme', 240, ingredients[7]),
        createIngredientQuantity(8, 'gramme', 150, ingredients[8]),
        createIngredientQuantity(9, 'gramme', 70, ingredients[9]),
        createIngredientQuantity(10, 'gramme', 100, ingredients[10]),
        createIngredientQuantity(11, 'gramme', 15, ingredients[11]),
        createIngredientQuantity(12, 'gramme', 50, ingredients[12]),
        createIngredientQuantity(13, 'gramme', 2, ingredients[13]),
        createIngredientQuantity(14, 'gramme', 2, ingredients[14]),
        createIngredientQuantity(15, 'gramme', 250, ingredients[15]),
        createIngredientQuantity(16, 'gramme', 170, ingredients[16]),
        createIngredientQuantity(17, 'tablespoon', 1, ingredients[17]),
        createIngredientQuantity(18, 'tablespoon', 1, ingredients[18]),
        createIngredientQuantity(19, 'tablespoon', 1, ingredients[19]),
        createIngredientQuantity(20, 'piece', 1, ingredients[20]),
        createIngredientQuantity(21, 'gramme', 50, ingredients[21]),
        //pesto pasta //
        createIngredientQuantity(22, 'tablespoon', 2, ingredients[11]),//olive oil
        createIngredientQuantity(23, 'tablespoon', 2, ingredients[24]),//cheese parmeason
        createIngredientQuantity(24, 'gramme', 450, ingredients[22]),//pasta
        createIngredientQuantity(25, 'cup', 0.5, ingredients[2]),//onion
        createIngredientQuantity(26, 'tablespoon', 2.5, ingredients[23]),//pesto
        createIngredientQuantity(27, 'teaspoon', 0.5, ingredients[0]),//salt
        createIngredientQuantity(28, 'tablespoon', 2, ingredients[14]),//pepper
        //salmon Honey//
        createIngredientQuantity(29, 'gramme', 250, ingredients[25]),//salmon
        createIngredientQuantity(30, 'tablespoon', 2, ingredients[26]),//honey
        createIngredientQuantity(31, 'tablespoon', 1, ingredients[27]),//soy sauce
        createIngredientQuantity(32, 'tablespoon', 1, ingredients[30]),//garlic
        createIngredientQuantity(33, 'teaspoon', 1, ingredients[28]),//chilli flakes
        createIngredientQuantity(34, 'gramme', 200, ingredients[6]),//rice
        createIngredientQuantity(35, 'gramme', 15, ingredients[29]),//Broccoli
        //fruit salad//
        createIngredientQuantity(36, 'cup',1, ingredients[31]),//apple
        createIngredientQuantity(37, 'cup', 1, ingredients[32]),//grapes
        createIngredientQuantity(38, 'cup', 1, ingredients[33]),//banana
        createIngredientQuantity(39, 'tablespoon', 1, ingredients[34]),//lemon juice
        createIngredientQuantity(40, 'teaspoon', 1, ingredients[35]),//chia seeds
        createIngredientQuantity(41, 'cup', 1, ingredients[36]),//kiwi
        createIngredientQuantity(42, 'cup', 1, ingredients[37]),//Pomegranate
        createIngredientQuantity(43, 'tablespoon', 1, ingredients[26]),//honey
        // Shrimp rice//
        createIngredientQuantity(44, 'gramme', 200, ingredients[38]),//Shrimp
        createIngredientQuantity(45, 'tablespoon',2, ingredients[39]),//Butter
        createIngredientQuantity(46, 'tablespoon', 1, ingredients[30]),//Garlic
        createIngredientQuantity(47, 'teaspoon', 1, ingredients[43]),//Paprika
        createIngredientQuantity(48, 'teaspoon', 1, ingredients[28]),//ChilliFlakes
        createIngredientQuantity(49, 'cup', 1, ingredients[6]),//Rice
        createIngredientQuantity(50, 'cup', 1, ingredients[32]),//Lemon
        createIngredientQuantity(51, 'gramme', 25, ingredients[42]),//Spring Onion
        createIngredientQuantity(52, 'teaspoon', 0.5, ingredients[0]),//Salt
        createIngredientQuantity(53, 'teaspoon', 0.5, ingredients[14]),//pepper

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
    const kaliaRecipeOwners = [
        owners[0]
    ]
    await Promise.all([
        createRecipe(0, "Kalia", "This is an Asian broth that is typically made using chicken or beef", kaliaIngredientQuantities, kaliaSteps, 5, 60, "Indian", kaliaRecipeOwners)
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
    const brianiRecipeOwners = [
        owners[0]
    ]
    await Promise.all([
        createRecipe(1, "Briani", "This is an Asian rice mix with potato, typically made using chicken or beef", brianiIngredientQuantities, brianiSteps, 5, 60, "Indian", brianiRecipeOwners)
    ]);

    //Start Recipe 3
    const chickpeaAndAvocadoSalad = [
        ingredientQuantities[7],
        ingredientQuantities[8],
        ingredientQuantities[9],
        ingredientQuantities[10],
        ingredientQuantities[11],
        ingredientQuantities[12],
        ingredientQuantities[13],
        ingredientQuantities[14],
    ]
    const chickpeaAndAvocadoSaladSteps = [
        "Mash the avocado in a bowl.",
        "Add the chickpeas, onion, and cucumber",
        "Drizzle with olive oil and lemon juice.",
        "Season with salt & pepper.",
        "Mix well and serve chilled"
    ]

    const chickpeaAndAvocadoSaladRecipeOwners = [
        owners[0]
    ]
    await Promise.all([
        createRecipe(2, "ChickPea&AvocadoSalad", "A delicious healthy salad", chickpeaAndAvocadoSalad, chickpeaAndAvocadoSaladSteps, 5, 30, "British", chickpeaAndAvocadoSaladRecipeOwners)
    ]);

    //End Recipe 3


    //Start Recipe 4
    const sweetPotatoandBlackBeanTacos = [
        ingredientQuantities[15],
        ingredientQuantities[16],
        ingredientQuantities[17],
        ingredientQuantities[18],
        ingredientQuantities[19],
        ingredientQuantities[20],
        ingredientQuantities[21],
    ]
    const sweetPotatoandBlackBeanTacosSteps = [
        "Roast sweet potato cubes at 200°C (400°F) for 20 minutes.",
        "Heat black beans with chili powder and cumin",
        "Assemble tacos with sweet potato, beans, avocado, and salsa"
    ]
    const sweetPotatoandBlackBeanTacosRecipeOwners = [
        owners[0]
    ]
    await Promise.all([
        createRecipe(3, "sweetPotatoandBlackBeanTacos", "A delicious healthy taco", sweetPotatoandBlackBeanTacos, sweetPotatoandBlackBeanTacosSteps, 5, 30, "British", sweetPotatoandBlackBeanTacosRecipeOwners)
    ]);
    //end recipe 4
    //staart
    const PestoAndPasta = [
        ingredientQuantities[22],
        ingredientQuantities[23],
        ingredientQuantities[24],
        ingredientQuantities[25],
        ingredientQuantities[26],
        ingredientQuantities[27],
        ingredientQuantities[28],

    ]

    const PestoAndPastaSteps = [
        "Boil pasta in salted water until soft; and then drain.",
        "Sauté chopped onion in olive oil until translucent.",
        "Stir in pesto sauce, salt, and pepper.",
        "Toss pasta with the pesto mixture until evenly coated.",
        "Sprinkle with grated Parmesan cheese and serve."
    ]
    const PestoAndPastaRecipeOwner = [
        owners[1]
    ]
    await Promise.all([
        createRecipe(4, "PestoAndPasta", "A beautiful pesto dish", PestoAndPasta, PestoAndPastaSteps, 8, 15, "Italian", PestoAndPastaRecipeOwner)
    ]);
    //end
    //start
    const SpicyHoneySalmonRice = [
        ingredientQuantities[29],
        ingredientQuantities[30],
        ingredientQuantities[31],
        ingredientQuantities[32],
        ingredientQuantities[33],
        ingredientQuantities[34],
        ingredientQuantities[35],

    ]

    const SpicyHoneySalmonRiceSteps = [
        "Preheat oven to 200°C (400°F).",
        "Mix honey, soy sauce, chili flakes, and minced garlic in a bowl.",
        "Place salmon fillets on a baking tray and drizzle with the honey mixture.",
        "Bake salmon for 12-15 minutes until it flakes easily with a fork.",
        "Steam broccoli until tender and cook rice according to package instructions.",
        "Serve salmon with rice and steamed broccoli."
    ];
    
    const SpicyHoneySalmonRiceRecipeOwner = [
        owners[1]
    ]
    await Promise.all([
        createRecipe(5, "SpicyHoneySalmonRice", "A sweet and spicy twist", SpicyHoneySalmonRice, SpicyHoneySalmonRiceSteps, 2, 45, "Chinese", SpicyHoneySalmonRiceRecipeOwner)
    ]);
    //end
    //start
    const FruitSalad = [
        ingredientQuantities[36],
        ingredientQuantities[37],
        ingredientQuantities[38],
        ingredientQuantities[39],
        ingredientQuantities[40],
        ingredientQuantities[41],
        ingredientQuantities[42],
        ingredientQuantities[43],

    ]
    const FruitSaladSteps = [
        "Halve the grapes, dice the apple, slice the banana, peel and segment the orange, and cut into bits",
        "In a large bowl, combine all the fruits.",
        "In a small bowl, whisk together the honey and lime juice to make the dressing.",
        "Drizzle the dressing over the fruit and gently toss to coat everything evenly.",
        "Sprinkle with chia seeds if using, and serve immediately or chill for 10 minutes before serving."
    ];
    
    
    const FruitSaladRecipeOwner = [
        owners[1]
    ]
    await Promise.all([
        createRecipe(6, "FruitSalad", "A summer treat", FruitSalad, FruitSaladSteps,4, 15, "Mediterranean", FruitSaladRecipeOwner)
    ]);
    //end

    //start//
    const GarlicButterShrimp = [
        ingredientQuantities[44],
        ingredientQuantities[45],
        ingredientQuantities[46],
        ingredientQuantities[47],
        ingredientQuantities[48],
        ingredientQuantities[49],
        ingredientQuantities[50],
        ingredientQuantities[51],
        ingredientQuantities[52],
        ingredientQuantities[53],

    ]
    const GarlicButterShrimpSteps = [
        "Melt butter in a pan over medium heat.",
        "Add minced garlic and sauté for 1 minute until fragrant.",
        "Toss in the shrimp, paprika, chili flakes, salt, and black pepper.",
        "Cook for 3-4 minutes until the shrimp turn pink and opaque.",
        "Stir in lemon juice and cook for 1 more minute.",
        "Serve hot over cooked rice, garnished with chopped spring onion."
    ];
    
    
    const GarlicButterShrimpRecipeOwner = [
        owners[1]
    ]
    await Promise.all([
        createRecipe(6, "GarlicButterShrimp", "A Creamy Delight",GarlicButterShrimp, GarlicButterShrimpSteps,2, 30, "Mediterranean", GarlicButterShrimpRecipeOwner)
    ]);

}
