import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonList,
  IonItem,
  IonInput,
  ModalController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interface/user';
import { Task } from '../interface/task';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonRow,
    IonCol,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonList,
    IonItem,
    IonInput
  ]
})
export class RegisterUserPage implements OnInit {
  userName: string = ""
  userPasword: string = ""

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {

  }

  back() {
    this.router.navigate(['/login'])
  }



  async createAccont() {

    let initialTask: [Task] = [{
      itemName: "hello",
      itemStartData: Date.now().toString(),
      itemEndData: Date.now().toString(),
      itemPriority: "Low",
      itemUser: this.userName

    }]


    let uid = this.userPasword + this.userName;

    let free = await this.authService.IsFree(uid)
    console.log(free)
    if (free == null || free == undefined && this.userName != "" && this.userPasword != "") {

      let newUser: User = {
        userName: this.userName,
        userPassword: this.userPasword,
        userType: "user",
        userTasks: initialTask
      }
      await this.authService.registerUserAuth(uid, newUser)

    }

  }


}
