import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  signIn() {
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe(
      (resp) => {
        const user = resp.find((u: any) => {
          return (
            u.email === this.loginForm.value.email &&
            u.password === this.loginForm.value.password
          );
        });
        if (user) {
          alert('Login successful');
          this.loginForm.reset();
          this.router.navigate(['/home-page']);
        } else {
          alert('user not found ! ');
        }
      },
      (error) => {
        alert('Login failed');
      }
    );
  }
}
