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
  getUserDetails(){
    return this.httpClient.get("https://localhost:7071/api/Employee")
  }
  getUserByid(param:any){
    return this.httpClient.get(`https://localhost:7071/api/Employee/${param}`)
  }
}
