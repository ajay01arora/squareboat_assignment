import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'assignment';

  constructor(private authService : AuthService) {  }

  currentUser:any;

  ngOnInit(): void {
    this.authService.currentUser?.subscribe(x => 
      {
        this.currentUser = x
      }
    );
   }
}


