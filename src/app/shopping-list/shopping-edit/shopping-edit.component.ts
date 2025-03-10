import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list.service'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  startedEditingSub: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: Ingredient
  @ViewChild('f') shopingListForm: NgForm

  constructor(private shoppingListService: ShoppingListService ) {}

  ngOnInit() {
    this.startedEditingSub = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index
        this.editMode = true
        this.editedItem = this.shoppingListService.getIngredientById(index)
        this.shopingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient)
    }
    this.editMode = false
    form.reset()
  }

  onClear() {
    this.shopingListForm.reset()
    this.editMode = false
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

  ngOnDestroy() {
    this.startedEditingSub.unsubscribe()
  }

}
