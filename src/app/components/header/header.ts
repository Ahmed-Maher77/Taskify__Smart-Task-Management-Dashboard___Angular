import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [RouterLink, RouterLinkActive],
})
export class Header {
  isMenuOpen = false;
  isAuthMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  get authUser() {
    return this.authService.authUser;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  handleLinkClick(): void {
    this.isAuthMenuOpen = false;
    this.closeMenu();
  }

  toggleAuthMenu(event: Event): void {
    event.stopPropagation();
    this.isAuthMenuOpen = !this.isAuthMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.handleLinkClick();
    void this.router.navigateByUrl('/login');
  }
}
