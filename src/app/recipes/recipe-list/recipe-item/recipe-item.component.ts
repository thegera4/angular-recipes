import { Component, Input } from '@angular/core'
import { Recipe } from '../../recipe.model'
import { RecipeService } from '../../recipes.service'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe
  @Input() index: number

  constructor(private recipeService: RecipeService) {}

}