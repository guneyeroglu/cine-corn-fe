import { Component, input } from '@angular/core';
import { CineCornLoadingListCardComponent } from '../loading-list-card/loading-list-card.component';
import { CineCornListCardComponent } from '../list-card/list-card.component';

@Component({
  selector: 'cine-corn-list-content',
  standalone: true,
  imports: [CineCornLoadingListCardComponent, CineCornListCardComponent],
  templateUrl: './list-content.component.html',
  styleUrl: './list-content.component.scss',
})
export class CineCornListContentComponent {
  title = input<string>('');
  lists = input<any[]>([]); //! IList.
  isLoading = input<boolean>(true);
}
