import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from './../../environments/environment'
import { AuthService } from './auth.service';

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
export class FollowerService {  

  constructor(private http: HttpClient, private authService : AuthService) {}

  GetUserListWhoCanFollow() {
    let user_id = this.authService.GetCurrentUserId();
    return this.http.get<any>(apiUrl+"can_follow_list/"+user_id, httpOptions);
  }

  GetFollowList() {
    let user_id = this.authService.GetCurrentUserId();
    return this.http.get<any>(apiUrl+"follow_list/"+user_id, httpOptions);
  }

  async AddFollower(follow_id: number) 
  {
    let user_id = this.authService.GetCurrentUserId();
    var value = {'user_id': user_id, 'follow_id': follow_id};
    const data = await this.http.post<any>(apiUrl+"add_follower", value, httpOptions).toPromise();
    console.log(data);
     return data;
  }

  async RemoveFollowing(follow_id: number) 
  {
    let user_id = this.authService.GetCurrentUserId();
    var value = {'user_id': user_id, 'follow_id': follow_id};
    const data = await this.http.post<any>(apiUrl+"remove_follower", value, httpOptions).toPromise();
    console.log(data);
     return data;
  }

  async RemoveFollower(user_id: number) 
  {
    let follow_id = this.authService.GetCurrentUserId();
    var value = {'user_id': user_id, 'follow_id': follow_id};
    const data = await this.http.post<any>(apiUrl+"remove_follower", value, httpOptions).toPromise();
    console.log(data);
     return data;
  }
}
