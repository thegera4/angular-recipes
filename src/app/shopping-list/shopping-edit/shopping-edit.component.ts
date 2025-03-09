import { Component, ElementRef, ViewChild } from '@angular/core'
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list.service'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef
  @ViewChild('amountInput') amountInput: ElementRef

  constructor(private shoppingListService: ShoppingListService ) {}

  onAddItem() {
    const newName = this.nameInput.nativeElement.value
    const newAmount = this.amountInput.nativeElement.value
    const newIngredient = new Ingredient(newName, newAmount)
    this.shoppingListService.addIngredient(newIngredient)
  }

}
