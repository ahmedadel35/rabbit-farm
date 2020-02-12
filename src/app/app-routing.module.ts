import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'notify',
    pathMatch: 'full'
  },
  {
    path: 'showEdited',
    loadChildren: () => import('./show/show.module').then( m => m.ShowPageModule)
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
  },
  {
    path: 'males',
    loadChildren: () => import('./males/males.module').then( m => m.MalesPageModule)
  },
  {
    path: 'show',
    loadChildren: () => import('./show/show.module').then( m => m.ShowPageModule)
  },
  {
    path: 'add-state',
    loadChildren: () => import('./add-state/add-state.module').then( m => m.AddStatePageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'illness',
    loadChildren: () => import('./illness/illness.module').then( m => m.IllnessPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
