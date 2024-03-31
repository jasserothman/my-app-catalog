import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";

import {AppUser} from "../model/AppUser";

import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formLogin!:FormGroup;
  user!:AppUser;
  errMessage:any;


  constructor( private fb:FormBuilder,
               private authenticateService:AuthenticationService,
               private router :Router) {
  }

  ngOnInit(): void {
    this.formLogin=this.fb.group({
      userName: this.fb.control(""),
      password:this.fb.control("")
    })
  }


  login() {
    let userName=this.formLogin.value.userName;
    let password=this.formLogin.value.password;
    this.authenticateService.login(userName,password).subscribe({
      next: data => {
        this.authenticateService.authenticateUser(data).subscribe({
          next: data2 => {

            this.router.navigateByUrl('/admin')
          }
        });
      },
      error :err => {
        this.errMessage="bad Credential";
      }
    });
  }}
