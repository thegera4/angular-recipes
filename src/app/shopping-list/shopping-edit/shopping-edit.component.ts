import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core'
import { Ingredient } from '../../shared/ingredient.model'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef
  @ViewChild('amountInput') amountInput: ElementRef
  @Output() ingredientAdded = new EventEmitter<Ingredient>()

  onAddItem() {
    const newName = this.nameInput.nativeElement.value
    const newAmount = this.amountInput.nativeElement.value
    const newIngredient = new Ingredient(newName, newAmount)
    this.ingredientAdded.emit(newIngredient)
  }

}
