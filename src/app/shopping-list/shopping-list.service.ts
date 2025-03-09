import { Ingredient } from "../shared/ingredient.model"
import { Subject } from "rxjs"

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()

  private ingredients: Ingredient[] = [
    new Ingredient('Cheese', 2),
    new Ingredient('Tomatoes', 8)
  ]

  /**
   * Method to get the initial ingredients array
   * @returns {Ingredient[]} A copy of the ingredients array
   */
  getIngredients(): Ingredient[] {
    return this.ingredients.slice()
  }

  /**
   * Method to add an ingredient to the ingredients array
   * @param {Ingredient} ingredient The ingredient to be added
   */
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  /**
   * Method to add multiple ingredients to the ingredients array
   * @param {Ingredient[]} ingredients The ingredients to be added
  */
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}