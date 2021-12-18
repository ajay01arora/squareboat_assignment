import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private postService : PostService, private authService : AuthService) { }

  post_content : string ="";  
  PostList : Array<any> =[];
  IsLoaderEnable : boolean = true;

  ngOnInit(): void {
    this.postService.GetPosts().subscribe(posts =>
      {
        this.PostList = posts.posts;
        this.IsLoaderEnable = false;
      });
  }

  async addPosts()
  {
    if(this.post_content != "")
    {
      const data = await this.postService.AddPosts(this.post_content);

      if(data.status == 200)
      {
        var name = this.authService.getCurrentUserName();
        var post = {'post_content': this.post_content, 'name' : name, 'created_at' :data.post.created_at};
        this.PostList = [post].concat(this.PostList)        
        this.post_content = "";
      }
    }
  }



}
