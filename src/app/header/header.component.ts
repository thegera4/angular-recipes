import { Component } from '@angular/core'
import {RecipeService} from "../recipes/recipes.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  collapsed: boolean = true

  constructor(private recipesService: RecipeService) {}

  onSaveData() {
    this.recipesService.storeRecipes()
  }

  onFetchData() {
    this.recipesService.fetchRecipes().subscribe()
  }
}
