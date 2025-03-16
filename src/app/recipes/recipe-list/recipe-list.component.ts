import { Component, OnDestroy, OnInit } from '@angular/core'
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipes.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = []
  recipesChangedSub: Subscription
  isFetching: boolean = false

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isFetching = true
    this.recipeService.fetchRecipes().subscribe(
      recipes => {
        this.isFetching = false
        this.recipes = recipes
      }
    )
    this.recipesChangedSub = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes
          this.isFetching = false
        }
      )
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy() {
    this.recipesChangedSub.unsubscribe()
  }
}
