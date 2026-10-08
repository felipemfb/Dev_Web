import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {
  login = signal('');
  password = signal('');
  errorMessage: string | null = null;
  constructor(private authService: AuthService, private router: Router){}

  submit(){
    this.authService.sendAuthentication(
      this.login(),
      this.password()
    ).subscribe(response => {
      console.log(response);
      if (response.status === 'error'){
        this.errorMessage = response.data.reason;
      } else {
        this.errorMessage = null;
        this.router.navigateByUrl('/cours');
      }
    });
  }
}