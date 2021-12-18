import { Component, OnInit } from '@angular/core';
import { FollowerService } from '../service/follower.service';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss']
})
export class FollowerComponent implements OnInit {

  constructor(private postService : FollowerService) { }

  post_content : string ="";  
  CanFollowList : Array<any> =[];
  FollowingList : Array<any> =[];
  FollowerList : Array<any> =[];
  IsLoaderEnable = true;

  ngOnInit(): void {

    this.postService.GetUserListWhoCanFollow().subscribe(posts =>
    {
      this.CanFollowList = posts.can_follow_list;
    });

    this.postService.GetFollowList().subscribe(posts =>
      {
        this.FollowingList = posts.following_list;
        this.FollowerList = posts.follower_list;
        this.IsLoaderEnable = false;
      });

  }

  async FollowRequest(follow_id : number)
  {
    const data = await this.postService.AddFollower(follow_id);
    if(data.status == 200)
    {
      this.CanFollowList.forEach((value,index)=>{
        if(value.id == follow_id) 
        {
          this.FollowingList.push(value);
          this.CanFollowList.splice(index,1);
        }
      });      
    }
  }

  async UnFollowRequest(follow_id : number)
  {
    const data = await this.postService.RemoveFollowing(follow_id);
    if(data.status == 200)
    {
      this.FollowingList.forEach((value,index)=>{
        if(value.id == follow_id) 
        {
          this.CanFollowList.push(value);
          this.FollowingList.splice(index,1);
        }
      });      
    }
  }
  async RemoveRequest(user_id : number)
  {
    const data = await this.postService.RemoveFollower(user_id);
    if(data.status == 200)
    {
      this.FollowerList.forEach((value,index)=>{
        if(value.id == user_id) 
        {
          this.FollowerList.splice(index,1);
        }
      });      
    }
  }
}
