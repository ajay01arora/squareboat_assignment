import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {  BehaviorSubject,  Observable } from 'rxjs';
import { environment } from './../../environments/environment'

const apiUrl = environment.apiUrl;

const httpOptions =  {
  headers: new HttpHeaders(
    {
      'Content-Type' : 'application/json',
      "Access-Control-Allow-Origin":"*"    
    })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 

  private currentUserSubject !: BehaviorSubject<any>;
  public currentUser !: Observable<any> ;

  constructor(private http: HttpClient) {
    var user = localStorage.getItem('isLoggedIn');
    if(user != undefined)
    {
      this.currentUserSubject = new BehaviorSubject <any> (JSON.parse(user));
      this.currentUser = this.currentUserSubject.asObservable();
    }
   
  }

  async registerUser(value: any) {
    
    const data = await this.http.post<any>(apiUrl+"register", value, httpOptions).toPromise();
    
    if (data.status == 200) 
    {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', data.loginSuccess);
        this.currentUserSubject?.next(data.loginSuccess);
    }    
     return data;
  } 

  async loginUser(value: any) {
    
    const data = await this.http.post<any>(apiUrl+"login", value, httpOptions).toPromise();
    
    if (data.status == 200) 
    {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', data.loginSuccess);
        this.currentUserSubject?.next(data.loginSuccess);
    }    
    return data;
  } 

  getCurrentUserName()  : string{
    var user = localStorage.getItem('currentUser');
    if(user != undefined)
    {
      return JSON.parse(user).name;
    }
    return  "";
  }

  GetCurrentUserId() {
    var user = localStorage.getItem('currentUser');
    if(user != undefined)
    {
      return JSON.parse(user).id;
    }
    return  "";
  }

  
  logout(): void 
  {
    localStorage.removeItem('currentUser');
    this.currentUserSubject?.next(null);
  
    localStorage.setItem('isLoggedIn', 'false');    
   }


}
