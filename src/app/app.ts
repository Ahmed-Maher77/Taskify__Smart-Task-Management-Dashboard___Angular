import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { SessionTimer } from './components/session-timer/session-timer';

@Component({
  selector: 'app-root',
  imports: [Header, SessionTimer, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('task-manager');
  protected readonly isInitialLoading = signal(true);

  ngOnInit(): void {
    // Keep a brief initial loader so the first paint feels intentional.
    setTimeout(() => {
      this.isInitialLoading.set(false);
    }, 1400);
  }
}
