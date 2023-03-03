import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserForRegistrationDTO } from 'src/models/UserForRegistrationDTO';
import { AuthService } from 'src/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$")]),
      confirmPassword: new FormControl('', Validators.required)
    });
  }
  public validateControls = (controlName:string)=>{
    return this.registerForm?.get(controlName)?.invalid && this.registerForm?.get(controlName)?.touched
  }
  public hasError = (controlName: string, errorName: string)=> {
    return this.registerForm?.get(controlName)?.hasError(errorName);
  }
  public registerUser = (registerFormValue: any)=> {
    const formValues = {...registerFormValue};
    const user: UserForRegistrationDTO = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      username: formValues.username,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword
    };
    this.authService.register("api/Authenticate/register", user).subscribe({
      next: (_)=> console.log("User Registered Successful"),
      error: (err:HttpErrorResponse)=> console.log(err.error.errros)
    })
  }

}

