import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserForAuthenticationDTO } from 'src/models/UserForAuthenticationDTO';
import { AuthResponseDTO } from 'src/models/AuthResponseDTO';
import { UserForRegistrationDTO } from 'src/models/UserForRegistrationDTO';


const Auth_API = 'https://localhost:7117/';
const httpOptions = {
headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})



export class AuthService {

constructor(private http: HttpClient) { }

 public loginUser = (route: string, body: UserForAuthenticationDTO)=>{
  return this.http.post<AuthResponseDTO>(Auth_API + route, body, httpOptions)
 }

 register(route : string, body: UserForRegistrationDTO): Observable<any>{
  return this.http.post<AuthResponseDTO>(Auth_API + route, body)
 }
}
