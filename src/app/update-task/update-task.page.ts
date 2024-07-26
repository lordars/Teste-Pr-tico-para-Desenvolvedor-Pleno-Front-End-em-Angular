import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  calendarOutline,
  addOutline,

} from 'ionicons/icons';
import { TodoService } from '../services/todo.service';



@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
  standalone: true,
  imports:
    [IonHeader, IonCardHeader, IonCardSubtitle,
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
export class UpdateTaskPage implements OnInit {

  @Input() task: any;

  userTask: string[] = []
  userSelected: any


  newTaskObj = {}
  itemName: any
  itemStartDate: any
  itemEndDate: any
  itemPriority: any
  itemUser: any

  newtaskObject: any | undefined

  constructor(public modalCtrl: ModalController, public todoService: TodoService,) {
    addIcons({
      close,
      pricetagOutline,
      calendarOutline,
      addOutline
    });
  }

  ngOnInit() {
    this.userTask.push("work")
    this.userTask.push("persona")


    this.itemName = this.task.value.itemName
    this.itemStartDate = this.task.value.itemStartData
    this.itemEndDate = this.task.value.itemEndData
    this.itemPriority = this.task.value.itemPriority
    this.userSelected = this.task.value.itemcategory
  }



  async dismis() {

    await this.modalCtrl.dismiss();



  }



  selectedCategory(index: number) {
    this.userSelected = this.userTask[index]
  }

  async updateTask() {
    this.newtaskObject = ({
      itemName: this.task.value.itemName,
      itemStartData: this.task.value.itemStartData,
      itemEndData: this.task.value.itemEndData,
      itemPriority: this.task.value.itemPriority,
      itemUser: this.userSelected
    })


    let uid: string = this.task.key;
    await this.todoService.updateTask(uid, this.newtaskObject)


    this.dismis()
  }

}
