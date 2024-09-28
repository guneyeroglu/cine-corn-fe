import { Component, input, output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cine-corn-drawer',
  standalone: true,
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class CineCornDrawerComponent {
  open = input.required<boolean>();
  close = output<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open']) {
      document.body.style.overflow = this.open() ? 'hidden' : '';
    }
  }

  onClose() {
    this.close.emit();
  }
}
