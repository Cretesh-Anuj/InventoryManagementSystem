import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';

import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { ModelsModule } from 'src/models/models.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    ModelsModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'login', component: LoginComponent
      }
    ])
  ],
  exports: [
    CommonModule,
    LoginComponent,
    RegisterComponent,
    AccordionModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule
  ]
})
export class AuthenticationModule { }

