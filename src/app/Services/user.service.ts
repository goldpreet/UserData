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

// add  data of user

  getUserDetails(){
    return this.httpClient.get("https://localhost:7071/api/Employee")
  }

// get all data of users

  getUserByid(param:any){
    return this.httpClient.get(`https://localhost:7071/api/Employee/${param}`)
  }
}

// get specific data of user