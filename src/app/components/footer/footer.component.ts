import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP_ROUTES } from '../../global/enums';
import { scrollToTop } from '../../global/functions';

@Component({
  selector: 'cine-corn-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class CineCornFooterComponent {
  homePath: string = APP_ROUTES.home;
  onScrollToTop = scrollToTop;
}
