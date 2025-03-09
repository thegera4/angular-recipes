import { Component, EventEmitter, Output } from '@angular/core'
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Home Made Pizza', 'Classsic, Delicious Pizza', 'https://www.simplyrecipes.com/thmb/KRw_r32s4gQeOX-d07NWY1OlOFk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg'),
    new Recipe('Tasy Shakshuka', 'You will not regret trying this!', 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/12/Shakshuka-main-1.jpg')
  ]
  @Output() recipeCardSelected = new EventEmitter<Recipe>()

  onRecipeSelected(recipe: Recipe) {
    this.recipeCardSelected.emit(recipe)
  }

}
