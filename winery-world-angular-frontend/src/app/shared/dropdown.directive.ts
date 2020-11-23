import {Directive, HostListener, HostBinding, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }
}
