import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public fb : FormBuilder, private router : Router, private authService : AuthService) { }

  registerForm!: FormGroup;
  submitted:Boolean=false;

  async ngOnInit(){

      this.registerForm = this.fb.group({
      name : ["", [Validators.required]],
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
      const data =  await this.authService.registerUser(this.registerForm.value)
      if(data != undefined)
        {          
              this.router.navigate(['/home'])
        }
    }      
  }
}

