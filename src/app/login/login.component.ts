import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public fb : FormBuilder, private router : Router, private authService : AuthService) { }

  registerForm!: FormGroup;
  submitted:Boolean=false;

  async ngOnInit(){

      this.registerForm = this.fb.group({
      email : ["", [Validators.required]],      
      password : ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  } 

  async register() 
  {
    this.submitted=true;    
    if (this.registerForm.invalid) {
      return;
     }

    if (this.registerForm.valid)
    { 
      const data =  await this.authService.loginUser(this.registerForm.value)
      if(data.loginSuccess)
      {          
            this.router.navigate(['/home'])
      }
      else
      {
        alert(data.message);
      }
    }      
  }
}

