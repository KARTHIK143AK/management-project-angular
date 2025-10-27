import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthGoService } from '@services/auth_go.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  error = signal('');


  constructor(private auth: AuthService, private router: Router, private authGoService: AuthGoService) {}

  async onSubmit() {
    this.error.set('');

    this.authGoService.validateLoginDetails(this.email(),this.password()).subscribe({
      next: (res: any) => {
        console.log('GraphQL response:', res);
        if (res && res.data && res.data.validateUsers && res.data.validateUsers.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error.set('Invalid credentials');
        }
      },
      error: (err) => console.error('❌ GraphQL error:', err),
    });
  }
}