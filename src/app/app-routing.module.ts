import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'notify',
    loadChildren: () => import('./notify/notify.module').then( m => m.NotifyPageModule)
  },
  {
    path: 'females',
    loadChildren: () => import('./females/females.module').then( m => m.FemalesPageModule)
  },
  {
    path: 'mony',
    loadChildren: () => import('./mony/mony.module').then( m => m.MonyPageModule)
  },
  {
    path: 'add-new',
    loadChildren: () => import('./add-new/add-new.module').then( m => m.AddNewPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
