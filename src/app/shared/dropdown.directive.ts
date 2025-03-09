import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core'

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen: boolean = false

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    // Check if the click was inside the dropdown element
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    
    if (clickedInside) {
      this.isOpen = !this.isOpen; // Toggle the dropdown if clicked inside
    } else {
      this.isOpen = false;   // Close the dropdown if clicked outside
    }

    const dropdownMenu = this.elRef.nativeElement.querySelector('.dropdown-menu')
    
    if(dropdownMenu) {
      if(this.isOpen) {
        dropdownMenu.classList.add('show')
      } else {
        dropdownMenu.classList.remove('show')
      }
    }
  }

  constructor(private elRef: ElementRef) {}
}