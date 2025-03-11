import { afterNextRender, inject, Injectable } from '@angular/core';
import { SignUpDataType, SignInDataType } from '@app/interface';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {
  AuthResponse,
  createClient,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase!: SupabaseClient | null;
  readonly currentUser = new BehaviorSubject<User | null>(null);
  router: Router = inject(Router);
  constructor() {
    afterNextRender(() => {
      this.initialize();
    });
  }

  initialize() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.supabase?.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // console.log(session!.user);
        this.currentUser.next(session!.user);
      } else {
        this.currentUser.next(null);
      }
    });

    this.loadUser();
  }

  public signUp(signUpData: SignUpDataType): Observable<AuthResponse> {
    const signUpPromise = this.supabase?.auth.signUp({
      email: signUpData.email?.toLocaleLowerCase() as string,
      password: signUpData.password as string,
      options: {
        data: {
          username: signUpData.username,
        },
      },
    });

    return from(signUpPromise!);
  }

  public signIn(signInData: SignInDataType): Observable<AuthResponse> {
    const promise = this.supabase?.auth.signInWithPassword({
      email: signInData.email.toLocaleLowerCase(),
      password: signInData.password,
    });
    // console.log(promise?.then((data) => data));

    return from(promise!);
  }

  public async signInWithSocialAuth(provider: 'google' | 'github') {
    await this.supabase?.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `http://localhost:4200`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  async loadUser() {
    if (this.currentUser.value) {
      // User is already set, no need to do anything else
      return;
    }
    const user = await this.supabase?.auth.getUser();

    if (user?.data.user) {
      // console.log('user.data.user', user.data.user);
      this.currentUser.next(user.data.user);
    } else {
      this.currentUser.next(null);
    }
  }
  // public signOut() {}
}
