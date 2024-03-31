import { Injectable } from '@angular/core';
import {AppUser} from "../model/AppUser";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users:AppUser[]=[];
  authenticatedUser:AppUser | undefined;

  constructor() {
    this.users.push({id:UUID.UUID(),  userName: "user1",password: "123",roles: ["USER"]},
      {id:UUID.UUID(),  userName: "user2",password: "123",roles: ["USER"]},
      {id:UUID.UUID(),  userName: "admin",password: "123",roles: ["ADMIN"]}

      );
  }
  public login(userName:String,password:String):Observable<AppUser>{
    let user=this.users.find(u=>u.userName==userName);
    if(!user){return throwError(()=>{new Error('user not found')})}
    if(user?.password!=password){return  throwError(()=>{new Error('bad credentails')})}
     return of(user);
  }

  // public login(userName:String,password:String):Observable<AppUser>{
  //   let user=this.users.find(u=>u.userName=userName);
  //   if(!user){return throwError(()=>{new Error('user not found')})}
  //   if(user?.password!=password){return  throwError(()=>{new Error('bad credentails')})}
  //   return of(user);
  // }

public authenticateUser(appUser:AppUser):Observable<boolean> {
    this.authenticatedUser=appUser;
    localStorage.setItem("userAuth",JSON.stringify(
      {userName:appUser.userName,roles:appUser.roles,jwt:"JWT_TOKEN"}));
    console.log(localStorage)

return of(true);
}
public hasRole(role:String):boolean{
    return  this.authenticatedUser!.roles.includes(role);

}
public isAuthenticated():boolean{
    return this.authenticatedUser!=undefined;
}
public logout():Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("userAuth");
    return of(true);
}
}
