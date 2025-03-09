#! /usr/bin/env node

console.log(
    'This script populates some test recipes to your database. Specified database as argument - e.g.: node populate-recipe-db "mongodb+srv://dbUser:kXVops04jV8MTI3s@cluster-meal-recommenda.fjbrt.mongodb.net/recipes?retryWrites=true&w=majority&appName=Cluster-Meal-Recommendation"'
); //TODO: Update this prompt

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

/**
 * Require the mongoose Models and name the models starting with upper case as per moongoose convention
 * https://mongoosejs.com/docs/index.html
 */
const Ingredient = require("../models/ingredient");
const Owner = require("../models/owner");
const IngredientAmount = require("../models/ingredientAmount");
const Recipe = require("../models/recipe");

// require all the logic functions for categorising recipes
const { isNutFree, isGlutenFree, isVegetarian, isVegan } = require("../logic/categorize-recipe");

const ingredients = [];
const ingredientAmounts = [];
const owners = [];
const recipes = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Connected successfully!");

    await Ingredient.deleteMany();
    await Owner.deleteMany();
    await IngredientAmount.deleteMany();
    await Recipe.deleteMany();
    console.log("Debug: Emptied all collections");

    await createListOfIngredients();
    await createListOfOwners();
    await createListOfIngredientAmounts();
    await createListOfRecipes();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

/**
 * The same sequence of operations is used for every create method; the comments in this method will be similar to the other methods
 * @param {*} indexParam 
 * @param {*} nameParam 
 * @param {*} categoryParam 
 * @param {*} dietaryAdviceParam 
 */
async function createIngredient(indexParam, nameParam, categoryParam) {
    //Create a JavaScript object with the arguments that have just come in via the parameters
    const ingredientObject = {
        name: nameParam,
        category: categoryParam
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

async function createIngredientAmount(indexParam, unitParam, quantityParam, ingredientParam) {
    const ingredientAmountObject = {
        unit: unitParam,
        quantity: quantityParam,
        ingredient: ingredientParam
    }
    const ingredientAmount = new IngredientAmount(ingredientAmountObject);
    await ingredientAmount.save();
    ingredientAmounts[indexParam] = ingredientAmount;
    console.log(`Added ingredientAmount ${JSON.stringify(ingredientAmountObject)}`);

}

async function createRecipe(indexParam, nameParam, descriptionParam, ingredientAmountsParam, stepsParam, servesParam, preparationTimeParam, originParam, ownerParam) {

    const recipeObject = {
        name: nameParam,
        description: descriptionParam,
        ingredientAmounts: ingredientAmountsParam,
        steps: stepsParam,
        serves: servesParam,
        preparationTime: preparationTimeParam,
        origin: originParam,
        owners: ownerParam,
        isGlutenFree: isGlutenFree(ingredientAmountsParam),
        isNutFree: isNutFree(ingredientAmountsParam),
        isVegetarian: isVegetarian(ingredientAmountsParam),
        isVegan: isVegan(ingredientAmountsParam)
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
        createIngredient(11, "Olive Oil", "Fat"),
        createIngredient(12, "Lemon", "Fruit"),
        createIngredient(13, "Salt", "Chemical"),
        createIngredient(14, "Pepper", "Spice"),
        createIngredient(15, "Sweet Potato", "Vegetable"),
        createIngredient(16, "Black Beans", "Vegetable"),
        createIngredient(17, "Chili Powder", "Spice"),
        createIngredient(18, "Cumin", "Spice"),
        createIngredient(19, "Extra Virgin Olive Oil", "Fat"),
        createIngredient(20, "Tortillas", "Carbohydrate"),
        createIngredient(21, "Avocado Salsa", "Vegetable"),
        createIngredient(22, "Pasta", "Carbohydrate"),
        createIngredient(23, "Pesto", "Sauce"),
        createIngredient(24, "Parmesan Cheese", "Dairy"),
        createIngredient(25, "Salmon", "Fish"),
        createIngredient(26, "Honey", "Sauce"),
        createIngredient(27, "Soy Sauce", "Sauce"),
        createIngredient(28, "Chilli Flakes", "Spice"),
        createIngredient(29, "Broccoli", "Vegetable"),
        createIngredient(30, "Garlic", "Allium"),
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
        createIngredient(40, "Garlic", "Allium"),
        createIngredient(41, "Lemon Juice", "Sauce"),
        createIngredient(42, "Spring Onion", "Vegetable"),
        createIngredient(43, "Paprika", "Spice"),
		//
		createIngredient(44, "Pistachio", "Nut"),
		createIngredient(45, "Flour", "Gluten")
    ]);

}

async function createListOfOwners() {
    console.log("Adding owners");
    await Promise.all([
        createOwner(0,
            "Aisha", "Bhudye", "01/01/2003", "Aisha was born in Newham to African Asian parents"),
        createOwner(1, "Alexis", "Xavier", "02/02/2003", "Alexis was born to parents from lovely Portugal")
    ]);

}

async function createListOfIngredientAmounts() {
    console.log("Adding ingredientAmounts");
    await Promise.all([
        createIngredientAmount(0, 'teaspoon', 2.0, ingredients[0]),
        createIngredientAmount(1, 'tablespoon', 5.0, ingredients[1]),
        createIngredientAmount(2, 'gramme', 1000.0, ingredients[2]),
        createIngredientAmount(3, 'cup', 2.0, ingredients[3]),
        createIngredientAmount(4, 'gramme', 2000.0, ingredients[4]),
        createIngredientAmount(5, 'gramme', 2000.0, ingredients[5]),
        createIngredientAmount(6, 'gramme', 2000.0, ingredients[6]),
        createIngredientAmount(7, 'gramme', 240, ingredients[7]),
        createIngredientAmount(8, 'gramme', 150, ingredients[8]),
        createIngredientAmount(9, 'gramme', 70, ingredients[9]),
        createIngredientAmount(10, 'gramme', 100, ingredients[10]),
        createIngredientAmount(11, 'tablespoon', 1, ingredients[11]),
        createIngredientAmount(12, 'gramme', 50, ingredients[12]),
        createIngredientAmount(13, 'gramme', 2, ingredients[13]),
        createIngredientAmount(14, 'gramme', 2, ingredients[14]),
        createIngredientAmount(15, 'gramme', 250, ingredients[15]),
        createIngredientAmount(16, 'gramme', 170, ingredients[16]),
        createIngredientAmount(17, 'tablespoon', 1, ingredients[17]),
        createIngredientAmount(18, 'tablespoon', 1, ingredients[18]),
        createIngredientAmount(19, 'tablespoon', 1, ingredients[11]),
        createIngredientAmount(20, 'piece', 1, ingredients[20]),
        createIngredientAmount(21, 'gramme', 50, ingredients[21]),
        //pesto pasta //
        createIngredientAmount(22, 'tablespoon', 2, ingredients[11]),//olive oil
        createIngredientAmount(23, 'tablespoon', 2, ingredients[24]),//cheese parmesan
        createIngredientAmount(24, 'gramme', 450, ingredients[22]),//pasta
        createIngredientAmount(25, 'cup', 0.5, ingredients[2]),//onion
        createIngredientAmount(26, 'tablespoon', 2.5, ingredients[23]),//pesto
        createIngredientAmount(27, 'teaspoon', 0.5, ingredients[0]),//salt
        createIngredientAmount(28, 'tablespoon', 2, ingredients[14]),//pepper
        //salmon Honey//
        createIngredientAmount(29, 'gramme', 250, ingredients[25]),//salmon
        createIngredientAmount(30, 'tablespoon', 2, ingredients[26]),//honey
        createIngredientAmount(31, 'tablespoon', 1, ingredients[27]),//soy sauce
        createIngredientAmount(32, 'tablespoon', 1, ingredients[30]),//garlic
        createIngredientAmount(33, 'teaspoon', 1, ingredients[28]),//chilli flakes
        createIngredientAmount(34, 'gramme', 200, ingredients[6]),//rice
        createIngredientAmount(35, 'gramme', 15, ingredients[29]),//Broccoli
        //fruit salad//
        createIngredientAmount(36, 'cup', 1, ingredients[31]),//apple
        createIngredientAmount(37, 'cup', 1, ingredients[32]),//grapes
        createIngredientAmount(38, 'cup', 1, ingredients[33]),//banana
        createIngredientAmount(39, 'tablespoon', 1, ingredients[34]),//lemon juice
        createIngredientAmount(40, 'teaspoon', 1, ingredients[35]),//chia seeds
        createIngredientAmount(41, 'cup', 1, ingredients[36]),//kiwi
        createIngredientAmount(42, 'cup', 1, ingredients[37]),//Pomegranate
        createIngredientAmount(43, 'tablespoon', 1, ingredients[26]),//honey
        // Shrimp rice//
        createIngredientAmount(44, 'gramme', 200, ingredients[38]),//Shrimp
        createIngredientAmount(45, 'tablespoon', 2, ingredients[39]),//Butter
        createIngredientAmount(46, 'tablespoon', 1, ingredients[30]),//Garlic
        createIngredientAmount(47, 'teaspoon', 1, ingredients[43]),//Paprika
        createIngredientAmount(48, 'teaspoon', 1, ingredients[28]),//ChilliFlakes
        createIngredientAmount(49, 'cup', 1, ingredients[6]),//Rice
        createIngredientAmount(50, 'cup', 1, ingredients[32]),//Lemon
        createIngredientAmount(51, 'gramme', 25, ingredients[42]),//Spring Onion
        createIngredientAmount(52, 'teaspoon', 0.5, ingredients[0]),//Salt
        createIngredientAmount(53, 'teaspoon', 0.5, ingredients[14]),//pepper
		
		createIngredientAmount(54, 'gramme', 20, ingredients[44]),//Pistachio
		createIngredientAmount(55, 'gramme', 200, ingredients[45])//Flour
    ]);

}

async function createListOfRecipes() {
    console.log("Adding recipes");

    //start kalia
    const kaliaIngredientAmounts = [
        ingredientAmounts[0],
        ingredientAmounts[1],
        ingredientAmounts[2],
        ingredientAmounts[3],
        ingredientAmounts[4],
        ingredientAmounts[5],
    ]
    const kaliaSteps = [
        "Soak the protein source of your choice overnight with the spices, the yoghurt and the salt",
        "Cut the potatoes into quarters and deep fry them until they develop a golden coat",
        "Slice the onions and deep fry them until they develop a golden coat",
        "Add the fried potatoes and the fried onions to the mix",
        "Bring to boil and then allow to simmer for about 30 mins, adding water to bring the broth to a consistency to your taste"
    ]
    await Promise.all([
        createRecipe(
            0,
            "Kalia",
            "This is an Asian broth that is typically made using chicken or beef",
            kaliaIngredientAmounts,
            kaliaSteps,
            5,
            60,
            "Indian",
            owners,
        )
    ]);
    //end kalia

    //start briani
    const brianiIngredientAmounts = [
        ingredientAmounts[0],
        ingredientAmounts[1],
        ingredientAmounts[2],
        ingredientAmounts[3],
        ingredientAmounts[4],
        ingredientAmounts[5],
        ingredientAmounts[6]
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
        createRecipe(
            1,
            "Briani",
            "This is an Asian rice mix with potato, typically made using chicken or beef",
            brianiIngredientAmounts,
            brianiSteps,
            5,
            60,
            "Indian",
            owners)
    ]);
    //end briani

    //Start Recipe 3
    const chickpeaAndAvocadoSalad = [
        ingredientAmounts[7],
        ingredientAmounts[8],
        ingredientAmounts[9],
        ingredientAmounts[10],
        ingredientAmounts[11],
        ingredientAmounts[12],
        ingredientAmounts[13],
        ingredientAmounts[14],
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
        createRecipe(
            2,
            "ChickPeaAvocadoSalad",
            "A delicious healthy salad",
            chickpeaAndAvocadoSalad,
            chickpeaAndAvocadoSaladSteps,
            5,
            30,
            "British",
            chickpeaAndAvocadoSaladRecipeOwners
        )
    ]);
    //End Recipe 3


    //Start Recipe 4
    const sweetPotatoandBlackBeanTacos = [
        ingredientAmounts[15],
        ingredientAmounts[16],
        ingredientAmounts[17],
        ingredientAmounts[18],
        ingredientAmounts[19],
        ingredientAmounts[20],
        ingredientAmounts[21],
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
        createRecipe(3,
            "sweetPotatoandBlackBeanTacos",
            "A delicious healthy taco",
            sweetPotatoandBlackBeanTacos,
            sweetPotatoandBlackBeanTacosSteps,
            5,
            30,
            "British",
            sweetPotatoandBlackBeanTacosRecipeOwners)
    ]);
    //end recipe 4

    //start
    const pestoAndPasta = [
        ingredientAmounts[22],
        ingredientAmounts[23],
        ingredientAmounts[24],
        ingredientAmounts[25],
        ingredientAmounts[26],
        ingredientAmounts[27],
        ingredientAmounts[28],

    ]

    const pestoAndPastaSteps = [
        "Boil pasta in salted water until soft; and then drain.",
        "Sauté chopped onion in olive oil until translucent.",
        "Stir in pesto sauce, salt, and pepper.",
        "Toss pasta with the pesto mixture until evenly coated.",
        "Sprinkle with grated Parmesan cheese and serve."
    ]
    const pestoAndPastaRecipeOwner = [
        owners[1]
    ]
    await Promise.all([
        createRecipe(4,
            "PestoAndPasta",
            "A beautiful pesto dish",
            pestoAndPasta,
            pestoAndPastaSteps,
            8,
            15,
            "Italian",
            pestoAndPastaRecipeOwner)
    ]);
    //end

    //start
    const spicyHoneySalmonRice = [
        ingredientAmounts[29],
        ingredientAmounts[30],
        ingredientAmounts[31],
        ingredientAmounts[32],
        ingredientAmounts[33],
        ingredientAmounts[34],
        ingredientAmounts[35],

    ]

    const spicyHoneySalmonRiceSteps = [
        "Preheat oven to 200°C (400°F).",
        "Mix honey, soy sauce, chili flakes, and minced garlic in a bowl.",
        "Place salmon fillets on a baking tray and drizzle with the honey mixture.",
        "Bake salmon for 12-15 minutes until it flakes easily with a fork.",
        "Steam broccoli until tender and cook rice according to package instructions.",
        "Serve salmon with rice and steamed broccoli."
    ];

    const spicyHoneySalmonRiceRecipeOwner = [
        owners[1]
    ]
    await Promise.all([
        createRecipe(5,
            "SpicyHoneySalmonRice",
            "A sweet and spicy twist",
            spicyHoneySalmonRice,
            spicyHoneySalmonRiceSteps,
            2,
            45,
            "Chinese",
            spicyHoneySalmonRiceRecipeOwner)
    ]);
    //end

    //start
    const fruitSalad = [
        ingredientAmounts[36],
        ingredientAmounts[37],
        ingredientAmounts[38],
        ingredientAmounts[39],
        ingredientAmounts[40],
        ingredientAmounts[41],
        ingredientAmounts[42],
        ingredientAmounts[43],

    ]
    const fruitSaladSteps = [
        "Halve the grapes, dice the apple, slice the banana, peel and segment the orange, and cut into bits",
        "In a large bowl, combine all the fruits.",
        "In a small bowl, whisk together the honey and lime juice to make the dressing.",
        "Drizzle the dressing over the fruit and gently toss to coat everything evenly.",
        "Sprinkle with chia seeds if using, and serve immediately or chill for 10 minutes before serving."
    ];


    const fruitSaladRecipeOwner = [
        owners[1]
    ]
    await Promise.all([
        createRecipe(6,
            "FruitSalad",
            "A summer treat",
            fruitSalad,
            fruitSaladSteps,
            4,
            15,
            "Mediterranean",
            fruitSaladRecipeOwner
        )
    ]);
    //end

    //start//
    const garlicButterShrimp = [
        ingredientAmounts[44],
        ingredientAmounts[45],
        ingredientAmounts[46],
        ingredientAmounts[47],
        ingredientAmounts[48],
        ingredientAmounts[49],
        ingredientAmounts[50],
        ingredientAmounts[51],
        ingredientAmounts[52],
        ingredientAmounts[53],

    ]
    const garlicButterShrimpSteps = [
        "Melt butter in a pan over medium heat.",
        "Add minced garlic and sauté for 1 minute until fragrant.",
        "Toss in the shrimp, paprika, chili flakes, salt, and black pepper.",
        "Cook for 3-4 minutes until the shrimp turn pink and opaque.",
        "Stir in lemon juice and cook for 1 more minute.",
        "Serve hot over cooked rice, garnished with chopped spring onion."
    ];


    const garlicButterShrimpRecipeOwner = [
        owners[1]
    ]
    await Promise.all([
        createRecipe(6,
            "GarlicButterShrimp",
            "A Creamy Delight",
            garlicButterShrimp,
            garlicButterShrimpSteps,
            2,
            30,
            "Mediterranean",
            garlicButterShrimpRecipeOwner)
    ]);

}