import { Component, OnDestroy, OnInit } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = []
  private ingredientsChangedSub: Subscription

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients()
    this.ingredientsChangedSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index)
  }

  ngOnDestroy() {
    this.ingredientsChangedSub.unsubscribe()
  }

}