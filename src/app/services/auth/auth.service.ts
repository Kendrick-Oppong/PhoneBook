import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignUpDataType, SignInDataType } from '@app/interface';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:5000/api';

  private readonly http: HttpClient = inject(HttpClient);
  private readonly toast: ToastrService = inject(ToastrService);

  private authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatusSubject.asObservable();

  constructor() {
    this.checkAuthStatus();
  }

  public signUp(signUpData: SignUpDataType): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.API_URL}/sign-up`, signUpData)
      .pipe(
        tap((response) => {
          this.toast.success(response.message);
        }),
        catchError((error) => {
          this.toast.error(error.error.message);
          return throwError(() => error);
        })
      );
  }

  public signIn(signInData: SignInDataType): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.API_URL}/sign-in`, signInData, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.toast.success(response.message);
          this.authStatusSubject.next(true);
        }),
        catchError((error) => {
          console.log(error);
          this.toast.error(error.error.message);
          return throwError(() => error);
        })
      );
  }

  public signOut(): Observable<{ message: string }> {
    return this.http
      .delete<{ message: string }>(`${this.API_URL}/sign-out`, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.toast.success(response.message);
          this.authStatusSubject.next(false);
        }),
        catchError((error) => {
          this.toast.error(error.error.message);
          return throwError(() => error);
        })
      );
  }

  public refreshToken(): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(
        `${this.API_URL}/refresh-token`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((response) => {
          this.toast.success(response.message);
        }),
        catchError((error) => {
          this.toast.error(error.error.message);
          return throwError(() => error);
        })
      );
  }

  private checkAuthStatus(): void {
    this.http
      .get<{ message: string }>(`${this.API_URL}/protected`, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.authStatusSubject.next(true);
        },
        error: () => {
          this.authStatusSubject.next(false);
        },
      });
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authStatus$;
  }
}
