import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'cine-corn-icon',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  template: `
    @if (!isIconLoaded) {
      <ngx-skeleton-loader
        count="1"
        animation="progress"
        [theme]="{
          width: size,
          height: size,
          marginBottom: 0,
          borderRadius: '50%',
          backgroundColor: color,
        }"
      />
    } @else {
      <span class="material-symbols-outlined" [style]="{ fontSize: size, color }">{{
        isIconLoaded ? icon : ''
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
  @Input() icon!: string;
  @Input() size: string = '24px';
  @Input() color: string = '#ebe9fe';
  isIconLoaded: boolean = false;

  ngAfterViewInit() {
    document.fonts.load(`${this.size} 'Material Symbols Outlined'`).then(() => {
      this.isIconLoaded = true;
    });
  }
}
