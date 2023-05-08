import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { LoginService } from 'src/app/login.service';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public userToCreate: User = {} as User
  public created = false
  public token: string = ""
  //public users : User[] = [];
  public isModalVisible = false;
  loginForm: FormGroup;


  constructor(private http: HttpClient, private loginService: LoginService, private formBuilder: FormBuilder, private router:Router) {
    this.loginForm = this.formBuilder.group({
      login_email: ['', [Validators.required, Validators.email]],
      login_password: ['', Validators.required]
    });
  }

  public close() {
    this.isModalVisible = false;
  }

  public signUp(): void {
    //this.created = true;
    this.loginService.signUp(this.userToCreate).subscribe((
        data: any) => {
        this.token = data.token
      }
    );
    this.created = true;
  }

  OnSubmit() {
    //console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.loginService.signIn(this.loginForm.value.login_email, this.loginForm.value.login_password).subscribe(
        data => {
          console.log(data);
          //if(data){
          //  this.router.navigate(['home']);
          //}
        });
    }
  }

}
