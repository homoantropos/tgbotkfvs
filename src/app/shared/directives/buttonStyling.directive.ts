import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appButtonStyle]'
})

export class ButtonStylingDirective {

  @Input()
  @HostBinding('style.backgroundColor') backGround = '';
  @HostBinding('style.color') color = 'white';
  @HostBinding('style.border') border = 'none';

  @HostListener('mouseenter') onEnter(): void {
    this.color = this.backGround;
    this.backGround = 'white';
  }

  @HostListener('mouseleave') onLeave(): void {
    if (this.color !== 'white') {
      this.backGround = this.color;
      this.color = 'white';
      this.border = 'none';
    }
  }

  @HostListener('mousedown') onMouseDown(): void {
    if (this.color === 'white') {
      this.onEnter();
    }
    this.border = `solid ${this.color} 2px`;
  }

  @HostListener('mouseup') onMouseUp(): void {
    this.onLeave();
  }
}
