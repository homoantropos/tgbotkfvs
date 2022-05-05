import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appResizing]'
})

export class ImageResizingDirective {

  @Input() photoSrc: string;
  @HostBinding('style.width') imageWidth: string;
  @HostBinding('style.height') imageHeight: string;

  @HostListener('load') onLoad(): void {
    const img = new Image();
    img.src = this.photoSrc;
    const l = img.width / img.height;
    if (l < 1) {
      this.imageHeight = `${window.innerHeight * 0.7}px`;
      this.imageWidth = `${window.innerHeight * 0.7 * l}px`;
    } else {
      this.imageWidth = `${window.innerWidth * 0.6}px`;
      this.imageHeight = `${window.innerWidth * 0.6 / l}px`;
    }
  }
}
