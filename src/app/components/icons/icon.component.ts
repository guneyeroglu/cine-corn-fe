import { Component, ElementRef, input, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'cine-corn-icon',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  template: `
    @if (!isIconLoaded) {
      @if (skeleton()) {
        <ngx-skeleton-loader
          count="1"
          animation="progress"
          [theme]="{
            width: size(),
            height: size(),
            marginBottom: 0,
            borderRadius: '50%',
            backgroundColor: color(),
          }"
        />
      }
    } @else {
      <span class="material-symbols-outlined" [style]="{ fontSize: size(), color: color() }">{{
        isIconLoaded ? icon() : ''
      }}</span>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      ngx-skeleton-loader {
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
  `,
})
export class CineCornIconComponent {
  constructor(public elementRef: ElementRef) {}

  icon = input<string>('');
  size = input<string>('24px');
  color = input<string>('#ebe9fe');
  skeleton = input<boolean>(true);
  isIconLoaded: boolean = false;

  ngAfterViewInit() {
    document.fonts.load(`${this.size()} 'Material Symbols Outlined'`).then(() => {
      this.isIconLoaded = true;
    });
  }
}
