// import { inject, Injectable } from '@angular/core';
// import { AuthService } from '@app/services/auth/auth.service';
// import { User } from '@supabase/supabase-js';
// import { firstValueFrom } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ContactsService {
//   private readonly authService: AuthService = inject(AuthService);

//   public async getAllContacts() {
//     try {
//       // Step 1: Get the authenticated user (auth_user_id)
//       const currentUser: User | null = await firstValueFrom(
//         this.authService.getCurrentUser()
//       );

//       console.log('currentUser', currentUser);

//       if (!currentUser) {
//         console.error('No user found.');
//         return null;
//       }

//       const authUserId = currentUser.id; // Supabase auth user id
//       console.log('currentUser.id', authUserId);
//       // Step 2: Find the user by auth_user_id in the users table
//       const user = await this.authService.supabase
//         ?.from('users')
//         .select('id') // We only need the user's id
//         .eq('auth_user_id', authUserId)
//         .limit(1)
//         .single(); // Get the single user matching auth_user_id
//       console.log('user', user?.data);

//       //   The user's id to be used in contacts
//       console.log('found user', user);
//       // Step 3: Fetch contacts and join related sub-tables (addresses, contact_info, social_links)
//       console.log('user?.data?.id', user?.data?.id);
//       console.log('user', user);
//       const contacts = await this.authService.supabase
//         ?.from('contacts')
//         .select(
//           `*,
//           addresses (*),
//           contact_info (*),
//           social_links (*)`
//         )
//         .eq('user_id', user?.data?.id); // Find contacts related to the user

//       // Step 4: Error handling

//       // Step 5: Return contacts with related sub-tables
//       console.log('Contacts with related info:', contacts);
//       return contacts;
//     } catch (err) {
//       console.error('An error occurred while fetching contacts:', err);
//       return null;
//     }
//   }
// }

import { inject, Injectable } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { User } from '@supabase/supabase-js';
import { from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private readonly authService: AuthService = inject(AuthService);

  public getAllContacts() {
    return from(this.authService.getCurrentUser()).pipe(
      switchMap((currentUser: User | null) => {
        if (!currentUser) {
          console.error('No user found.');
          return of(null);
        }

        const authUserId = currentUser.id;
        console.log('currentUser.id', authUserId);

        if (!this.authService.supabase) {
          console.error('Supabase client is not initialized.');
          return of(null);
        }

        return from(
          this.authService.supabase
            .from('users')
            .select('id')
            .eq('auth_user_id', authUserId)
            .limit(1)
            .single()
        ).pipe(
          switchMap((user) => {
            if (!user?.data?.id) {
              console.error('User not found.');
              return of(null);
            }

            const userId = user.data.id;
            console.log('user?.data?.id', userId);

            return from(
              this.authService
                .supabase!.from('contacts')
                .select(
                  `*,
                  addresses (*),
                  contact_info (*),
                  social_links (*)`
                )
                .eq('user_id', userId)
            );
          }),
          catchError((err) => {
            console.error('An error occurred while fetching contacts:', err);
            return of(null);
          })
        );
      }),
      catchError((err) => {
        console.error(
          'An error occurred while fetching the current user:',
          err
        );
        return of(null);
      })
    );
  }
}
