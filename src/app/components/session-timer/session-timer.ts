import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-timer',
  standalone: true,
  templateUrl: './session-timer.html',
  styleUrl: './session-timer.css',
})
export class SessionTimer implements OnInit, OnDestroy {
  timer = 0;
  timerDisplay = '00:00:00';
  timerRunning = false;
  private timerInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateTimerDisplay();
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.clearTimerInterval();
  }

  toggleTimer(): void {
    if (this.timerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer(): void {
    if (this.timerRunning) return;
    this.timerRunning = true;
    this.timerInterval = setInterval(() => {
      this.timer++;
      this.updateTimerDisplay();
      this.cdr.detectChanges();
    }, 1000);
  }

  stopTimer(): void {
    this.timerRunning = false;
    this.clearTimerInterval();
  }

  resetTimer(): void {
    this.stopTimer();
    this.timer = 0;
    this.updateTimerDisplay();
  }

  updateTimerDisplay(): void {
    const hours = Math.floor(this.timer / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((this.timer % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (this.timer % 60).toString().padStart(2, '0');

    this.timerDisplay = `${hours}:${minutes}:${seconds}`;
  }

  private clearTimerInterval(): void {
    if (!this.timerInterval) return;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }
}
