import { Ingredient } from "../shared/ingredient.model"
import { Subject } from "rxjs"

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()

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

  /**
   * Method to get an ingredient from the ingredients array
   * @param {number} id The index of the ingredient to get
   * @returns {Ingredient} The ingredient at the specified index
  */
  getIngredientById(id: number): Ingredient {
    return this.ingredients[id]
  }

  /**
   * Method to update an ingredient in the ingredients array
   * @param {number} id The index of the ingredient to update
   * @param {Ingredient} newIngredient The new ingredient to replace the old one
  */
  updateIngredient(id: number, newIngredient: Ingredient) {
    this.ingredients[id] = newIngredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  /**
   * Method to delete an ingredient from the ingredients array
   * @param {number} id The index of the ingredient to delete
  */
  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}