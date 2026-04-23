import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface AuthUser {
  id?: number;
  email: string;
  fullName?: string;
}

interface StoredAuthUser extends AuthUser {
  password: string;
}

interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authStorageKey = 'authData';
  private readonly usersStorageKey = 'authUsers';
  private readonly usersApiUrl = 'http://localhost:3000/users';
  private readonly jsonServerUnavailableSessionKey = 'taskify:jsonServerUnavailable';
  private readonly authUserSignal = signal<AuthUser | null>(this.readFromStorage());

  readonly authUser = this.authUserSignal.asReadonly();

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return this.authUserSignal() !== null;
  }

  saveAuth(user: AuthUser): void {
    this.authUserSignal.set(user);
    localStorage.setItem(this.authStorageKey, JSON.stringify(user));
  }

  logout(): void {
    this.authUserSignal.set(null);
    localStorage.removeItem(this.authStorageKey);
  }

  async signup(payload: SignupPayload): Promise<void> {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const localUsers = this.readUsersFromStorage();

    if (localUsers.some((user) => user.email.toLowerCase() === normalizedEmail)) {
      throw new Error('An account with this email already exists.');
    }

    let createdServerUser: StoredAuthUser | null = null;

    if (!this.shouldSkipJsonServer()) {
      try {
        const existingServerUsers = await this.findServerUsersByEmail(normalizedEmail);
        if (existingServerUsers.length > 0) {
          throw new Error('An account with this email already exists.');
        }

        createdServerUser = await firstValueFrom(
          this.http.post<StoredAuthUser>(this.usersApiUrl, {
            fullName: payload.fullName.trim(),
            email: normalizedEmail,
            password: payload.password,
          }),
        );
        this.clearJsonServerUnavailable();
      } catch (error) {
        if (error instanceof Error && error.message.includes('already exists')) {
          throw error;
        }
        this.markJsonServerUnavailable();
      }
    }

    const userToStore: StoredAuthUser = createdServerUser ?? {
      fullName: payload.fullName.trim(),
      email: normalizedEmail,
      password: payload.password,
    };

    this.upsertLocalUser(userToStore);
    this.saveAuth({
      id: userToStore.id,
      email: userToStore.email,
      fullName: userToStore.fullName,
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    const normalizedEmail = email.trim().toLowerCase();

    const localMatch = this
      .readUsersFromStorage()
      .find((storedUser) => storedUser.email.toLowerCase() === normalizedEmail && storedUser.password === password);

    if (localMatch) {
      this.saveAuth({
        id: localMatch.id,
        email: localMatch.email,
        fullName: localMatch.fullName,
      });
      return true;
    }

    if (!this.shouldSkipJsonServer()) {
      try {
        const serverUsers = await firstValueFrom(
          this.http.get<StoredAuthUser[]>(
            `${this.usersApiUrl}?email=${encodeURIComponent(normalizedEmail)}&password=${encodeURIComponent(password)}`,
          ),
        );

        if (serverUsers.length > 0) {
          const matchedUser = serverUsers[0];
          this.clearJsonServerUnavailable();
          this.upsertLocalUser(matchedUser);
          this.saveAuth({
            id: matchedUser.id,
            email: matchedUser.email,
            fullName: matchedUser.fullName,
          });
          return true;
        }
      } catch {
        this.markJsonServerUnavailable();
      }
    }

    return false;
  }

  private readFromStorage(): AuthUser | null {
    const rawData = localStorage.getItem(this.authStorageKey);
    if (!rawData) return null;

    try {
      return JSON.parse(rawData) as AuthUser;
    } catch {
      localStorage.removeItem(this.authStorageKey);
      return null;
    }
  }

  private readUsersFromStorage(): StoredAuthUser[] {
    const rawData = localStorage.getItem(this.usersStorageKey);
    if (!rawData) return [];

    try {
      return JSON.parse(rawData) as StoredAuthUser[];
    } catch {
      localStorage.removeItem(this.usersStorageKey);
      return [];
    }
  }

  private writeUsersToStorage(users: StoredAuthUser[]): void {
    localStorage.setItem(this.usersStorageKey, JSON.stringify(users));
  }

  private upsertLocalUser(user: StoredAuthUser): void {
    const users = this.readUsersFromStorage();
    const nextUsers = users.filter((existingUser) => existingUser.email.toLowerCase() !== user.email.toLowerCase());
    nextUsers.push(user);
    this.writeUsersToStorage(nextUsers);
  }

  private async findServerUsersByEmail(email: string): Promise<StoredAuthUser[]> {
    return firstValueFrom(this.http.get<StoredAuthUser[]>(`${this.usersApiUrl}?email=${encodeURIComponent(email)}`));
  }

  private shouldSkipJsonServer(): boolean {
    return sessionStorage.getItem(this.jsonServerUnavailableSessionKey) === '1';
  }

  private markJsonServerUnavailable(): void {
    sessionStorage.setItem(this.jsonServerUnavailableSessionKey, '1');
  }

  private clearJsonServerUnavailable(): void {
    sessionStorage.removeItem(this.jsonServerUnavailableSessionKey);
  }
}
