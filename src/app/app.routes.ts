import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'add-new-task',
    loadComponent: () => import('./add-new-task/add-new-task.page').then(m => m.AddNewTaskPage)
  },
  {
    path: 'update-task',
    loadComponent: () => import('./update-task/update-task.page').then(m => m.UpdateTaskPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register-user',
    loadComponent: () => import('./register-user/register-user.page').then(m => m.RegisterUserPage)
  },
];
