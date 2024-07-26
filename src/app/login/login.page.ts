import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



//Se deixa pronto para criar um login profesional, mas  app usará um login basico.
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';



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



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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

export class LoginPage implements OnInit {

  userName: any
  userPasword: any

  public errorMessage?: string;

  constructor(
    public modalCtrl: ModalController,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    private router: Router
  ) {


  }

  async ngOnInit() {
    // If coming back after logging into Auth0,
    // and using CURRENT Implicit (web) Login
    if (window.location.hash) {
      const loadingIndicator = await this.showLoadingIndictator();
      try {
        // await this.authService.handleLoginCallback(window.location.href);
      } catch (e) {
        //  this.errorMessage = e.message;
      } finally {
        loadingIndicator.dismiss();
      }
    }
  }

  async login() {
    // Display loading indicator while Auth Connect login window is open
    let loadingIndicator = await this.showLoadingIndictator();
    try {

      await this.authService.login(this.userName, this.userPasword);
    } catch (e) {
      console.error(e);
    } finally {
      loadingIndicator.dismiss();
    }
  }

  async registerUser() {
    const loadingIndicator = await this.showLoadingIndictator();
    try {

      this.router.navigate(['/register-user'])
    } catch (e) {
      // console.error(e.message);
    } finally {
      loadingIndicator.dismiss();
    }
  }

  private async showLoadingIndictator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Opening login window...',
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }

}
