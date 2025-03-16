import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipes.service";

export const recipesResolver: ResolveFn<Recipe[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const recipesService: RecipeService = inject(RecipeService);
  const recipes: Recipe[] =  recipesService.getRecipes();
  if (recipes.length === 0) {
    return recipesService.fetchRecipes();
  } else {
    return recipes;
  }
};
