import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { PageMapPage } from './pages/page-map/page-map.page';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },

  {
    path:'test',
    component: LeafletMapComponent
  },
  {
    path: '',
    component: LeafletMapComponent
  },
  // {
  //   path: '',
  //   component: PageMapPage
  // },
  // {
  //   path: 'page-map',
  //   loadChildren: () => import('./pages/page-map/page-map.module').then( m => m.PageMapPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
