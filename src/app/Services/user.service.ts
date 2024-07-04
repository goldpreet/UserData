import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  httpClient = inject(HttpClient)

  addUserDetails(payload: any) {
    return this.httpClient.post(`https://localhost:7071/api/Employee`, payload)
  }

  // add  data of user

  getUserDetails() {
    return this.httpClient.get("https://localhost:7071/api/Employee")
  }

  // get all data of users

  getUserByid(param: any) {
    return this.httpClient.get(`https://localhost:7071/api/Employee/${param}`)
  }


  updateUserData(payload: any) {
    console.log(payload, "payload");

    return this.httpClient.put(`https://localhost:7071/api/Employee/${payload.guidId}`, payload)
  }

  login(payload:any){
    return this.httpClient.post(`https://localhost:7071/api/login`, payload)
  }
}

// get specific data of user