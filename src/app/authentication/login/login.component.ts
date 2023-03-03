import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponseDTO } from 'src/models/AuthResponseDTO';
import { UserForAuthenticationDTO } from 'src/models/UserForAuthenticationDTO';
import { AuthService } from 'src/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private returnUrl!: string;
  loginForm!: FormGroup;
   errorMessage: string = '';
   showError!: boolean;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$")]),
     })
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  public validateControls = (controlName:string)=>{
    return this.loginForm?.get(controlName)?.invalid && this.loginForm?.get(controlName)?.touched
  }
  public hasError = (controlName: string, errorName: string)=> {
    return this.loginForm?.get(controlName)?.hasError(errorName);
  }
  public login = (loginFormValues: any)=>{
    debugger;
    this.showError = false;
    const formValues = {...loginFormValues};
     const user: UserForAuthenticationDTO = {
      username: formValues.username,
      password: formValues.password
     };
     this.authService.loginUser("api/Authenticate/login", user).subscribe({
      next: (res: AuthResponseDTO)=> {
        localStorage.setItem("token", res.token);
        this.router.navigate([this.returnUrl]);
       },
      error: (err:HttpErrorResponse)=> {
        this.errorMessage = err.message;
        this.showError = true
      }
     })
  }
}
