import { Injectable } from "@angular/core"
import { Recipe } from "./recipe.model"
import { Ingredient } from "../shared/ingredient.model"
import { ShoppingListService } from "../shopping-list/shopping-list.service"

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Home Made Pizza', 
      'Classsic, Delicious Pizza', 
      'https://www.simplyrecipes.com/thmb/KRw_r32s4gQeOX-d07NWY1OlOFk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg',
      [new Ingredient('Dough', 1), new Ingredient('Tomato Sauce Can', 1), new Ingredient('Mozzarella Cheese', 3)]
    ),
    new Recipe(
      'Tasy Shakshuka', 
      'You will not regret trying this!', 
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/12/Shakshuka-main-1.jpg',
      [new Ingredient('Eggs', 2), new Ingredient('Tomatoes', 4), new Ingredient('Onions', 1)]
    )
  ]

  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * Method to get a copy of the array so that the original array is not modified
   * @returns Copy of the recipes array
  */
  getRecipes() {
    return this.recipes.slice()
  }

  /**
   * Method to add ingredients to the shopping list when the user clicks on the 'Add to Shopping List' button from the recipe detail page
   * @param ingredients 
  */
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }

  /**
   * Method to get a recipe by its id (for the recipe details view)
   * @param id
   * @returns Recipe details
  */
  getRecipeById(id: number) {
    return this.recipes[id]
  }

}