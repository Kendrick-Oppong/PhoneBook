import { afterNextRender, Injectable } from '@angular/core';
import { SignUpDataType, SignInDataType } from '@app/interface';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import {
  AuthResponse,
  createClient,
  OAuthResponse,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase: SupabaseClient | null = null;

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

  public createUser(authUser: User | null): Observable<any> {
    if (!authUser) {
      return throwError(() => new Error('No auth user provided.'));
    }

    const { id: authUserId, email } = authUser;

    //  Query the database to check if the user already exists
    const checkUserExistsPromise = this.supabase
      ?.from('users')
      .select('auth_user_id, email')
      .or(`auth_user_id.eq.${authUserId},email.eq.${email}`)
      .limit(1);

    if (!checkUserExistsPromise) {
      return throwError(() => new Error('Supabase client is not initialized.'));
    }
    return from(checkUserExistsPromise).pipe(
      switchMap((checkResult) => {
        if (checkResult.error) {
          return throwError(() => checkResult.error);
        }

        // If the user doesn't exist, insert the new user
        if (checkResult.data.length === 0) {
          const createUserPromise = this.supabase?.from('users').insert([
            {
              auth_user_id: authUser.id,
              email: authUser.email,
              username: authUser.user_metadata['username'] || '',
            },
          ]);

          return from(createUserPromise!).pipe(
            map((createResult) => {
              if (createResult.error) {
                return { error: createResult.error, data: null };
              }
              return { error: null, data: createResult.data };
            })
          );
        } else {
          return of({ error: null, data: 'User already exists.' });
        }
      })
    );
  }

  public signIn(signInData: SignInDataType): Observable<AuthResponse> {
    const promise = this.supabase?.auth.signInWithPassword({
      email: signInData.email.toLocaleLowerCase(),
      password: signInData.password,
    });
    console.log(promise?.then((data) => data));

    return from(promise!);
  }

  public signInWithSocialAuth(
    provider: 'google' | 'github'
  ): Observable<OAuthResponse> {
    const signInPromise = this.supabase?.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `http://localhost:4200`,
      },
    });

    return from(signInPromise!);

    // return from(signInPromise!).pipe(
    //   switchMap((signInResult) => {
    //     if (signInResult.error) {
    //       return throwError(() => signInResult.error);
    //     }

    //     //  User is authenticated, now call createUser
    //     const user = signInResult.data?.user;

    //     if (user) {
    //       return this.createUser(user);
    //     } else {
    //       return of({
    //         error: 'No user information found after OAuth sign-in.',
    //         data: null,
    //       });
    //     }
    //   })
    // );
  }

  // public signOut() {}
}
