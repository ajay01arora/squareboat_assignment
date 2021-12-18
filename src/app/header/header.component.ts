import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private backendService : AuthService) {  }

  username : string = ""; 

  ngOnInit(): void {  

      this.username =  this.backendService.getCurrentUserName();
   }
 

  logout(){
      this.backendService.logout()
      this.router.navigate(['/login'])
  }

}
