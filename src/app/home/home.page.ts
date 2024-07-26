import { CommonModule, } from '@angular/common';
import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonHeader, IonCardHeader, IonCardSubtitle,
  IonCard, IonToolbar, IonTitle, IonContent, IonItem,
  IonLabel,
  IonIcon,
  IonCardContent,
  IonRow,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  ellipse,
  shareOutline,
  checkmarkCircleOutline,
  trashOutline,
  add,

} from 'ionicons/icons';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { FormsModule } from '@angular/forms';
import { UpdateTaskPage } from '../update-task/update-task.page';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';






@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],


  standalone: true,

  imports: [IonHeader,
    IonToolbar, IonCard,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    CommonModule,
    IonCardHeader,
    IonCardSubtitle,
    IonIcon,
    IonCardContent,
    IonRow,
    IonFab,
    IonFabButton,
    CommonModule,
    FormsModule,

  ],
})

export class HomePage {



  // {
  //   itemName: "Coding",
  //   itemDeuDate: "01-13-21",
  //   itemProiority: "high",
  //   itemcategory: "work"
  // },

  todoList: any = [
  ]
  taskList: any = []

  today: number = Date.now()

  constructor(private modalCtrl: ModalController, public todoService: TodoService, public auth: AuthenticationService, private router: Router) {

    // if (auth.IsLog() == "admin" || auth.IsLog() != "user") {
    //   console.log(auth.IsLog())
    //   this.router.navigate(['/login'])
    // }

    console.log(this.getAllTask())
    addIcons({
      ellipse,
      shareOutline,
      checkmarkCircleOutline,
      trashOutline,
      add
    });


  }




  async addTask() {


    for (const test of this.todoList) {
      this.taskList = test.value.userTasks
    }
    console.log(this.taskList)


    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage,
    });


    modal.onDidDismiss().then(newTaskObj => {
      this.getAllTask()

    })
    return await modal.present()

  }


  async getAllTask() {

    this.todoList = await this.todoService.getAllTask()







  }
  delete(key: string) {
    this.todoList.splice(key, 1)
    this.todoService.deleteTask(key)
    this.getAllTask()
  }

  async update(selectedTask: any) {
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage,
      componentProps: { task: selectedTask }
    })

    modal.onDidDismiss().then(() => { this.getAllTask() })

    return await modal.present();
  }

}
