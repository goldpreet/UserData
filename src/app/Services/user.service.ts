import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  httpClient = inject(HttpClient)
  addUserDetails(payload: any) 
  {
    return this.httpClient.post(`https://localhost:7071/api/Employee`, payload)
  }
}
