import { Injectable } from "@angular/core"
import { Recipe } from "./recipe.model"
import { Ingredient } from "../shared/ingredient.model"
import { ShoppingListService } from "../shopping-list/shopping-list.service"
import { Subject } from "rxjs"
import {HttpClient, HttpParams} from "@angular/common/http";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class RecipeService {
  baseURL: string = 'https://angular-http-requests-c9796-default-rtdb.firebaseio.com/'
  recipesUrlPath: string = 'recipes.json'
  private recipes: Recipe[] = []
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>()

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

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

  /**
   * Method to add a new recipe
   * @param recipe
  */
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  /**
   * Method to update a recipe
   * @param index
   * @param newRecipe
  */
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  /**
   * Method to delete a recipe
   * @param index
  */
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }

  /**
   * Method to store recipes in the database
  */
  storeRecipes() {
    const recipes: Recipe[] = this.recipes
    this.http.put(this.baseURL + this.recipesUrlPath, recipes)
      .subscribe(response => {
        console.log(response)
      })
  }

  /**
   * Method to fetch recipes from the database. The AuthInterceptorService is used to add the token to all requests.
   * @returns Observable of recipes
  */
  fetchRecipes() {
    return this.http.get<Recipe[]>(this.baseURL + this.recipesUrlPath)
      .pipe(
        map(recipes => { // Map (do some operation in) the response to ensure that we have an ingredients array
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
        }),
        tap(recipes => { // Tap (do something with the response w/o changing it) into the observable to set the recipes
          this.setRecipes(recipes)
        })
      )
  }

  /**
   * Method to set recipes
   * @param recipes
  */
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    this.recipesChanged.next(this.recipes.slice())
  }

  /**
   * Method to get all recipes
   * @returns Array of recipes
  */
  getRecipes() {
    return this.recipes.slice()
  }
}
