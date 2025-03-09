const Ingredient = require("../models/ingredient");;
const IngredientAmount = require("../models/ingredientAmount");;
const { isNutFree, isGlutenFree, isVegetarian, isVegan } = require("../logic/categorize-recipe");

const ingredients = [];
const ingredientAmounts = [];


test('This array of ingredientAmounts for a fruit salad should be categorised as vegetarian, vegan, nut free and gluten free', () => {

	createListOfIngredients();
	createListOfIngredientAmounts();

	const fruitSaladIngredientAmounts = [
		ingredientAmounts[36],
		ingredientAmounts[37],
		ingredientAmounts[38],
		ingredientAmounts[39],
		ingredientAmounts[40],
		ingredientAmounts[41],
		ingredientAmounts[42],
		ingredientAmounts[43],

	];

	expect(isVegetarian(fruitSaladIngredientAmounts)).toBe(true);
	expect(isVegan(fruitSaladIngredientAmounts)).toBe(true);
	expect(isGlutenFree(fruitSaladIngredientAmounts)).toBe(true);
	expect(isNutFree(fruitSaladIngredientAmounts)).toBe(true);

});


test('This array of ingredientAmounts for a fruit salad with pistachio should be categorised as vegetarian, vegan and gluten free', () => {

	createListOfIngredients();
	createListOfIngredientAmounts();

	const fruitSaladIngredientAmounts = [
		ingredientAmounts[36],
		ingredientAmounts[37],
		ingredientAmounts[38],
		ingredientAmounts[39],
		ingredientAmounts[40],
		ingredientAmounts[41],
		ingredientAmounts[42],
		ingredientAmounts[43],
		ingredientAmounts[54]

	];

	expect(isVegetarian(fruitSaladIngredientAmounts)).toBe(true);
	expect(isVegan(fruitSaladIngredientAmounts)).toBe(true);
	expect(isGlutenFree(fruitSaladIngredientAmounts)).toBe(true);
	expect(isNutFree(fruitSaladIngredientAmounts)).toBe(false);

});

test('This array of ingredientAmounts for briani should be categorised as nut free and gluten free', () => {

	createListOfIngredients();
	createListOfIngredientAmounts();

	const fruitSaladIngredientAmounts = [
		ingredientAmounts[0],
		ingredientAmounts[1],
		ingredientAmounts[2],
		ingredientAmounts[3],
		ingredientAmounts[4],
		ingredientAmounts[5],
		ingredientAmounts[6]
	];

	expect(isVegetarian(fruitSaladIngredientAmounts)).toBe(false);
	expect(isVegan(fruitSaladIngredientAmounts)).toBe(false);
	expect(isGlutenFree(fruitSaladIngredientAmounts)).toBe(true);
	expect(isNutFree(fruitSaladIngredientAmounts)).toBe(true);

});

test('This array of ingredientAmounts for briani with some flour should be categorised as nut free', () => {

	createListOfIngredients();
	createListOfIngredientAmounts();

	const fruitSaladIngredientAmounts = [
		ingredientAmounts[0],
		ingredientAmounts[1],
		ingredientAmounts[2],
		ingredientAmounts[3],
		ingredientAmounts[4],
		ingredientAmounts[5],
		ingredientAmounts[6],
		ingredientAmounts[55]
	];

	expect(isVegetarian(fruitSaladIngredientAmounts)).toBe(false);
	expect(isVegan(fruitSaladIngredientAmounts)).toBe(false);
	expect(isGlutenFree(fruitSaladIngredientAmounts)).toBe(false);
	expect(isNutFree(fruitSaladIngredientAmounts)).toBe(true);

});


/**
 * A lot of the functions here are almost exactly the same as in populate-recipe-db.js; the only difference is we are not asking mongoose to save to MongoDB
 * Everytime something changes in populate-recipe-db.js, we will have to update the code here to match and vice versa.
 */


function createListOfIngredients() {
	console.log("Adding ingredients");

	createIngredient(0, "Salt", "Chemical");
	createIngredient(1, "Briani mix", "Spice");
	createIngredient(2, "Onion", "Allium");
	createIngredient(3, "Plain Yoghurt", "Dairy");
	createIngredient(4, "Chicken", "Bird");
	createIngredient(5, "Potato", "Carbohydrate");
	createIngredient(6, "Rice", "Carbohydrate");
	createIngredient(7, "Chickpeas", "Carbohydrate");
	createIngredient(8, "Avocado", "Fruit");
	createIngredient(9, "Red Onion", "Vegetable");
	createIngredient(10, "Cucumber", "Vegetable");
	createIngredient(11, "Olive Oil", "Fat");
	createIngredient(12, "Lemon", "Fruit");
	createIngredient(13, "Salt", "Chemical");
	createIngredient(14, "Pepper", "Spice");
	createIngredient(15, "Sweet Potato", "Vegetable");
	createIngredient(16, "Black Beans", "Vegetable");
	createIngredient(17, "Chili Powder", "Spice");
	createIngredient(18, "Cumin", "Spice");
	createIngredient(19, "Extra Virgin Olive Oil", "Fat");
	createIngredient(20, "Tortillas", "Carbohydrate");
	createIngredient(21, "Avocado Salsa", "Vegetable");
	createIngredient(22, "Pasta", "Carbohydrate");
	createIngredient(23, "Pesto", "Sauce");
	createIngredient(24, "Parmesan Cheese", "Dairy");
	createIngredient(25, "Salmon", "Fish");
	createIngredient(26, "Honey", "Sauce");
	createIngredient(27, "Soy Sauce", "Sauce");
	createIngredient(28, "Chilli Flakes", "Spice");
	createIngredient(29, "Broccoli", "Vegetable");
	createIngredient(30, "Garlic", "Allium");
	//fruit salad//
	createIngredient(31, "Apple", "Fruit");
	createIngredient(32, "Grapes", "Fruit");
	createIngredient(33, "Banana", "Fruit");
	createIngredient(34, "Lemon Juice", "Sauce");
	createIngredient(35, "Chia Seeds", "Fruit");
	createIngredient(36, "Kiwi", "Fruit");
	createIngredient(37, "Pomegranate", "Fruit");
	//shrimp rice//
	createIngredient(38, "Shrimp", "Fish");
	createIngredient(39, "Butter", "Dairy");
	createIngredient(40, "Garlic", "Allium");
	createIngredient(41, "Lemon Juice", "Sauce");
	createIngredient(42, "Spring Onion", "Vegetable");
	createIngredient(43, "Paprika", "Spice");
	//
	createIngredient(44, "Pistachio", "Nut"),
	createIngredient(45, "Flour", "Gluten")
}

function createListOfIngredientAmounts() {
	console.log("Adding ingredientAmounts");
	createIngredientAmount(0, 'teaspoon', 2.0, ingredients[0]);
	createIngredientAmount(1, 'tablespoon', 5.0, ingredients[1]);
	createIngredientAmount(2, 'gramme', 1000.0, ingredients[2]);
	createIngredientAmount(3, 'cup', 2.0, ingredients[3]);
	createIngredientAmount(4, 'gramme', 2000.0, ingredients[4]);
	createIngredientAmount(5, 'gramme', 2000.0, ingredients[5]);
	createIngredientAmount(6, 'gramme', 2000.0, ingredients[6]);
	createIngredientAmount(7, 'gramme', 240, ingredients[7]);
	createIngredientAmount(8, 'gramme', 150, ingredients[8]);
	createIngredientAmount(9, 'gramme', 70, ingredients[9]);
	createIngredientAmount(10, 'gramme', 100, ingredients[10]);
	createIngredientAmount(11, 'tablespoon', 1, ingredients[11]);
	createIngredientAmount(12, 'gramme', 50, ingredients[12]);
	createIngredientAmount(13, 'gramme', 2, ingredients[13]);
	createIngredientAmount(14, 'gramme', 2, ingredients[14]);
	createIngredientAmount(15, 'gramme', 250, ingredients[15]);
	createIngredientAmount(16, 'gramme', 170, ingredients[16]);
	createIngredientAmount(17, 'tablespoon', 1, ingredients[17]);
	createIngredientAmount(18, 'tablespoon', 1, ingredients[18]);
	createIngredientAmount(19, 'tablespoon', 1, ingredients[11]);
	createIngredientAmount(20, 'piece', 1, ingredients[20]);
	createIngredientAmount(21, 'gramme', 50, ingredients[21]);
	//pesto pasta //
	createIngredientAmount(22, 'tablespoon', 2, ingredients[11]);//olive oil
	createIngredientAmount(23, 'tablespoon', 2, ingredients[24]);//cheese parmesan
	createIngredientAmount(24, 'gramme', 450, ingredients[22]);//pasta
	createIngredientAmount(25, 'cup', 0.5, ingredients[2]);//onion
	createIngredientAmount(26, 'tablespoon', 2.5, ingredients[23]);//pesto
	createIngredientAmount(27, 'teaspoon', 0.5, ingredients[0]);//salt
	createIngredientAmount(28, 'tablespoon', 2, ingredients[14]);//pepper
	//salmon Honey//
	createIngredientAmount(29, 'gramme', 250, ingredients[25]);//salmon
	createIngredientAmount(30, 'tablespoon', 2, ingredients[26]);//honey
	createIngredientAmount(31, 'tablespoon', 1, ingredients[27]);//soy sauce
	createIngredientAmount(32, 'tablespoon', 1, ingredients[30]);//garlic
	createIngredientAmount(33, 'teaspoon', 1, ingredients[28]);//chilli flakes
	createIngredientAmount(34, 'gramme', 200, ingredients[6]);//rice
	createIngredientAmount(35, 'gramme', 15, ingredients[29]);//Broccoli
	//fruit salad//
	createIngredientAmount(36, 'cup', 1, ingredients[31]);//apple
	createIngredientAmount(37, 'cup', 1, ingredients[32]);//grapes
	createIngredientAmount(38, 'cup', 1, ingredients[33]);//banana
	createIngredientAmount(39, 'tablespoon', 1, ingredients[34]);//lemon juice
	createIngredientAmount(40, 'teaspoon', 1, ingredients[35]);//chia seeds
	createIngredientAmount(41, 'cup', 1, ingredients[36]);//kiwi
	createIngredientAmount(42, 'cup', 1, ingredients[37]);//Pomegranate
	createIngredientAmount(43, 'tablespoon', 1, ingredients[26]);//honey
	// Shrimp rice//
	createIngredientAmount(44, 'gramme', 200, ingredients[38]);//Shrimp
	createIngredientAmount(45, 'tablespoon', 2, ingredients[39]);//Butter
	createIngredientAmount(46, 'tablespoon', 1, ingredients[30]);//Garlic
	createIngredientAmount(47, 'teaspoon', 1, ingredients[43]);//Paprika
	createIngredientAmount(48, 'teaspoon', 1, ingredients[28]);//ChilliFlakes
	createIngredientAmount(49, 'cup', 1, ingredients[6]);//Rice
	createIngredientAmount(50, 'cup', 1, ingredients[32]);//Lemon
	createIngredientAmount(51, 'gramme', 25, ingredients[42]);//Spring Onion
	createIngredientAmount(52, 'teaspoon', 0.5, ingredients[0]);//Salt
	createIngredientAmount(53, 'teaspoon', 0.5, ingredients[14]);//pepper

	createIngredientAmount(54, 'gramme', 20, ingredients[44]);//Pistachio
	createIngredientAmount(55, 'gramme', 200, ingredients[45]);//Flour

}


function createIngredient(indexParam, nameParam, categoryParam) {
	//Create a JavaScript object with the arguments that have just come in via the parameters
	const ingredientObject = {
		name: nameParam,
		category: categoryParam
	};
	//Create an object using our Moongoose model
	const ingredient = new Ingredient(ingredientObject);
	ingredients[indexParam] = ingredient;
}

function createIngredientAmount(indexParam, unitParam, quantityParam, ingredientParam) {
	const ingredientAmountObject = {
		unit: unitParam,
		quantity: quantityParam,
		ingredient: ingredientParam
	}
	const ingredientAmount = new IngredientAmount(ingredientAmountObject);
	ingredientAmounts[indexParam] = ingredientAmount;
}
