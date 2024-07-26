import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../interface/task';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
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
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonChip
} from '@ionic/angular/standalone';


import {
  close,
  pricetagOutline,
  calendarOutline

} from 'ionicons/icons';
import { TodoService } from '../services/todo.service';




@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
  standalone: true,
  imports: [IonHeader, IonCardHeader, IonCardSubtitle,
    IonCard, IonToolbar, IonTitle, IonContent, IonItem,
    IonLabel,
    IonIcon,
    IonCardContent,
    IonRow,
    IonFab,
    IonFabButton,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonChip,
    CommonModule,
    FormsModule
  ]
})
export class AddNewTaskPage implements OnInit {

  categories: string[] = ["work", "personal", "home"]

  taskName: any
  taskStartDate: any
  taskEndDate: any
  taskPriority: any
  taskCategory: any

  taskObject: any | undefined


  constructor(public modalCtrl: ModalController, public todoService: TodoService) {
    addIcons({
      close,
      pricetagOutline,
      calendarOutline
    });
  }

  ngOnInit() {
  }



  async dismis() {
    await this.modalCtrl.dismiss(this.taskObject);
  }


  selectedCategory(index: number) {
    this.taskCategory = this.categories[index]
  }

  async addTask() {
    this.taskObject = ({
      itemName: this.taskName,
      itemStartData: this.taskStartDate,
      itemEndData: this.taskEndDate,
      itemPriority: this.taskPriority,
      itemcategory: this.taskCategory
    })


    let uid: string = this.taskName + this.taskStartDate + this.taskCategory;

    if (uid) {

      await this.todoService.addTask(uid, this.taskObject)
    } else {
      console.log("can 't save empty task ")
    }

    this.dismis()

  }
}
