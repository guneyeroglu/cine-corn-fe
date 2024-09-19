import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'cine-corn-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class CineCornMenuComponent {
  target = input<HTMLButtonElement | null>(null);
  close = output<void>();

  menuPosition = computed(() => {
    const targetElement: HTMLButtonElement | null = this.target();

    if (!targetElement) {
      return { top: '0px', left: '0px' };
    }

    const rect = targetElement.getBoundingClientRect();
    const menuWidth: number = 125;
    return {
      top: `${rect.bottom}px`,
      left: `${rect.x + rect.width / 2 - menuWidth / 2}px`,
    };
  });

  onClose() {
    this.close.emit();
  }
}
