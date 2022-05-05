import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appVideoResize]'
})

export class VideoResizingDirective {

  @Input() videoSrc: string;
  @HostBinding('style.width') videoWidth: string;
  @HostBinding('style.height') videoHeight: string;

  @HostListener('load') onLoad(): void {
    setTimeout(
      () => {
        const video = document.createElement('video');
        video.src = this.videoSrc;
        video.play().then(
          () => {
            const frameWidth = video.videoWidth;
            const frameHeight = video.videoHeight;
            if (frameWidth < frameHeight) {
              this.videoHeight = `${window.innerHeight * 0.7}px`;
            } else {
              this.videoWidth = `${window.innerWidth * 0.5}px`;
            }
            video.pause();
          }
        );
      }, 0
    );
  }
}
