import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  goTo(index: number) {
    this.currentIndex = index;
    this.resetAutoSlide();
  }

  prev() {
    this.currentIndex = this.currentIndex === 0 ? 2 : this.currentIndex - 1;
    this.resetAutoSlide();
  }

  next() {
    this.currentIndex = this.currentIndex === 2 ? 0 : this.currentIndex + 1;
    this.resetAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 2000);
  }

  resetAutoSlide() {
    clearInterval(this.intervalId);
    this.startAutoSlide();
  }
}
