import { Injectable } from '@angular/core';
const token_Key = 'auth-token';
const user_Key = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

constructor() { }

signOut(): void {
  window.sessionStorage.clear();
}

public saveToken(token: string): void{
  window.sessionStorage.removeItem(token_Key);
  window.sessionStorage.setItem(token_Key, token);
}

public getToken(): string | null {
 return window.sessionStorage.getItem(token_Key);
}
public saveUser(user: any) : void {
  window.sessionStorage.removeItem(user_Key);
  window.sessionStorage.setItem(user_Key, JSON.stringify(user));

}
public getUser(): any {
  const user = window.sessionStorage.getItem(user_Key);
  if (user) {
    return JSON.parse(user);
  }

  return {};
}
}
