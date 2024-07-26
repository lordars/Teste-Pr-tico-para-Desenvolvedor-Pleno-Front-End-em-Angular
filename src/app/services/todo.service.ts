import { Injectable } from '@angular/core';
import { analytics } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';



interface Task {
  itemName: string,
  StartData: string,
  EndData: string,
  itemPriority: string,
  itemcategory: string



}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private storage: Storage) { this.init() }





  addTask(key: string, value: any,) {

    this.storage.set(key, value)

  }


  async deleteTask(key: string,) {
    await this.storage.remove(key);

  }


  updateTask(key: string, newvalue: any,) {

    this.storage.set(key, newvalue)
    this.getAllTask()

  }

  async getAllTask() {
    //serve para limpar a storage.
    // await this.storage.clear();

    let tasks: any = []

    this.storage.forEach((key, value, index) => {
      tasks.push({ 'key': value, 'value': key })
    });

    return tasks

  }


  async init() {
    await this.storage.create()
  }

}
