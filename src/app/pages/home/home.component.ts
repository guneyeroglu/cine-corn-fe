import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
