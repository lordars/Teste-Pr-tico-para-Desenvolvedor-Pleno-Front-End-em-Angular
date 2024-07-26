import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { this.init() }

  setTask(key: string, value: any) {
    this.storage.set(key, value)
  }


  removeTask(key: string) {
    this.storage.remove(key)
  }

  getAllTask() {
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