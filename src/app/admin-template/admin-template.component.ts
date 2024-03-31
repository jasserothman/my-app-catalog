import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

import {Route, Router} from "@angular/router";
import {AppUser} from "../model/AppUser";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent implements OnInit{
 authUser:AppUser | undefined;

  constructor(public authService:AuthenticationService,private route:Router) {
  }



  handleLogOut() {
this.authService.logout().subscribe({
  next:(data)=>{
    this.route.navigateByUrl("/login")
  }
})
  }

  ngOnInit(): void {
  }
}
