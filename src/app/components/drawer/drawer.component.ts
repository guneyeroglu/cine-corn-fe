import { Component, input, output, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cine-corn-drawer',
  standalone: true,
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class CineCornDrawerComponent {
  private routerSubscription!: Subscription;
  constructor(private router: Router) {}

  open = input.required<boolean>();
  close = output<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open']) {
      document.body.style.overflow = this.open() ? 'hidden' : '';
    }
  }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.onClose();
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  onClose() {
    this.close.emit();
  }
}
