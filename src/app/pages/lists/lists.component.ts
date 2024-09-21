import { Component } from '@angular/core';
import { CineCornListContentComponent } from '../../components/list-content/list-content.component';

@Component({
  selector: 'cine-corn-lists',
  standalone: true,
  imports: [CineCornListContentComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss',
})
export class CineCornListsComponent {
  title: string = 'All Lists';
  lists: any[] = []; //! IList.
  isLoading: boolean = true;
}
