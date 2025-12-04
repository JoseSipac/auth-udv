import { Routes } from '@angular/router';
import { canActivateAuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'home',
    canActivate: [canActivateAuthGuard],
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage),
    children: [
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/perfil/perfil.page').then(m => m.PerfilPage)
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('./pages/configuracion/configuracion.page').then(m => m.ConfiguracionPage)
      }
      // 👈 ya SIN redirect '' -> 'perfil'
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
