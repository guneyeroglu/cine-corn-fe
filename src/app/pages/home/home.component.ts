import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { CineCornMovieCardComponent } from '../../components/movie-card/movie-card.component';
import { movies as mockMoviesDb } from '../../global/consts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    CineCornMovieCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  movies = mockMoviesDb;
  _isMuted: boolean = JSON.parse(localStorage.getItem('volume') ?? 'true');
  isMuted: boolean = this._isMuted;
  play: boolean = true;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.isMuted = JSON.parse(localStorage.getItem('volume') ?? 'true');
    const video = this.videoPlayer.nativeElement;
    video.muted = this.isMuted;
    localStorage.setItem('volume', JSON.stringify(this.isMuted));
  }

  handleVolumeVideo() {
    this.isMuted = !this.isMuted;
    const video = this.videoPlayer.nativeElement;
    video.muted = this.isMuted;
    localStorage.setItem('volume', JSON.stringify(this.isMuted));
  }

  handlePlayVideo() {
    const video = this.videoPlayer.nativeElement;

    if (!this.play) {
      video.play();
    } else {
      video.pause();
    }

    this.play = !this.play;
  }
}
