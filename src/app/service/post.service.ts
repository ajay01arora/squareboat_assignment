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
export class PostService {
 
  constructor(private http: HttpClient, private authService : AuthService) {}

  async AddPosts(post_content: string) 
  {
    let user_id = this.authService.GetCurrentUserId();
    var value = {'post_content' : post_content, 'added_by': user_id};
    const data = await this.http.post<any>(apiUrl+"add_posts", value, httpOptions).toPromise(); 
     return data;
  }

  GetPosts() {
    let user_id = this.authService.GetCurrentUserId();
    return this.http.get<any>(apiUrl+"get_posts/"+user_id, httpOptions);
  } 

}
