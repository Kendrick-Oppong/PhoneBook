import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { Observable, } from 'rxjs';
import {  map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/sign-in']);
        return false;
      }
    })
  );
};
// export const isSignedInAuthGuard: CanActivateFn = (): Observable<boolean> => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   return authService.getCurrentUser().pipe(
//     map((user) => {
//       if (!user) {
//         return false;
//       } else {
//         router.navigate(['/']);
//         return true;
//       }
//     })
//   );
// };
