import { Component, inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-oauth',
  imports: [],
  templateUrl: './oauth.component.html',
})
export class OauthComponent {
  private readonly authService: AuthService = inject(AuthService);
  public handleGoogleAuth() {
    this.authService.signInWithSocialAuth('google');
  }
  public async handleGitHubAuth() {
    await this.authService.signInWithSocialAuth('github');
  }
}
