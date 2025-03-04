// myself is required so that a one exported function can be used by another function from within the same js file
const myself = require('./categorize-recipe.js');

// enum: ["Spice", "Allium", "Vegetable", "Dairy", "Fat", "Fruit", "Gluten", "Carbohydrate", "Chemical", "Fish", "Mammal", "Bird", "Egg" , "Nut"]
// use module.exports so this function can be used from another js file
module.exports.isGlutenFree = (ingredientAmounts) => {
	for (const ingredientAmount of ingredientAmounts) {
		const ingredient = ingredientAmount.ingredient;
		if (ingredient.category == 'Gluten') {
			//If any of the ingredientAmounts contains gluten, then the recipe is not gluten free
			return false;
		}
	}
	//If we have looped over every ingredient and couldn't find any with gluten, then the ingredients and therefore the recipe is gluten free
	return true;
}

module.exports.isNutFree = (ingredientAmounts) => {
	for (const ingredientAmount of ingredientAmounts) {
		const ingredient = ingredientAmount.ingredient;
		if (ingredient.category == 'Nut') {
			//If any of the ingredientAmounts contains nut, then the recipe is not nut free
			return false;
		}
	}
	//If we have looped over every ingredient and couldn't find any with nuts, then the ingredients and therefore the recipe is nut free	
	return true;
}

module.exports.isVegetarian = (ingredientAmounts) => {
	for (const ingredientAmount of ingredientAmounts) {
		const ingredient = ingredientAmount.ingredient;
		if (ingredient.category == 'Fish' || ingredient.category == 'Mammal' || ingredient.category == 'Bird') {
			//If it has any of the above ingredientAmounts, then is not a vegetarian recipe
			return false;
		}
	}
	return true;
}

module.exports.isVegan = (ingredientAmounts) => {
	if (myself.isVegetarian(ingredientAmounts)) {
		//First check, if the recipe is vegetarian, then check for additional dietary requirements
		for (const ingredientAmount of ingredientAmounts) {
			const ingredient = ingredientAmount.ingredient;
			if (ingredient.category == 'Egg' || ingredient.category == 'Dairy') {
				//If the recipe is vegetarian but still contains any of the above, then it is not vegan
				return false;
			}
		}
		return true;
	}
	return false;
}
