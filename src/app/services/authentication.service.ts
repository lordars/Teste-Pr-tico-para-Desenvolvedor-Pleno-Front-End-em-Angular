import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Persons } from '../interface/persons';
import { User } from '../interface/user';
import { Storage } from '@ionic/storage-angular';


let loged: string = "false";
let userLoged: string
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private router: Router, private userStorage: Storage) { this.init() }
  // users: User[] = [{
  //   userName: "admin",
  //   userPassword: "admin",
  //   userType: "admin"
  // }, {
  //   userName: "pepe",
  //   userPassword: "pepe",
  //   userType: "user"
  // }]

  async login(userName: string, userPassword: string) {


    const userlog: User = await this.userStorage.get(userPassword + userName);


    if (!userlog) return;
    if (userlog.userType == "admin") {
      console.log("entro admin")



      loged = "admin"


      this.router.navigate(['/home'])

    } else {



      if (userlog.userName != "" && userlog.userPassword != "" && userlog.userType == "user") {

        loged = "user"
        userLoged = userlog.userPassword + userlog.userName
        this.router.navigate(['/home'])
      }






    }

  }
  newLog(log: string) {
    loged = log;
  }

  IsLog() {
    return loged;

  }


  async getUserLog() {
    return userLoged
  }

  async IsFree(uid: string) {
    const name = await this.userStorage.get(uid);
    console.log(name)

  }


  async registerUserAuth(uid: string, user: User) {
    //if (userName == "admin" && userPassword == "admin") { this.router.navigate(['/register-user']) }

    await this.userStorage.set(uid, user)

    console.log(this.userStorage.get(uid))
    loged = "user"
    this.router.navigate(['/home', uid, user])
  }

  async registerAdimAuth(uid: string, user: User) {
    //if (userName == "admin" && userPassword == "admin") { this.router.navigate(['/register-user']) }

    await this.userStorage.set(uid, user)
    user.userType = "admin"
    console.log(this.userStorage.get(uid))
    loged = "admin"
    this.router.navigate(['/home', uid, user])
  }
  async init() {
    await this.userStorage.create()
  }

  async getOneUsers(uid: string) {


    return this.userStorage.get(uid)
  }
  async getAllUsers() {


    let users: any = []
    this.userStorage.forEach((key, value, index) => {
      users.push({ 'key': value, 'value': key })
    });


    console.log(users)
  }
}
