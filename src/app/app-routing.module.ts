import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { PlannerPage } from './pages/planner/planner.page';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path:'planner',
    component: PlannerPage
  },
  {
    path:'map',
    component: LeafletMapComponent
  },
  {
    path: '',
    component: LeafletMapComponent
  },
  // {
  //   path: 'planner',
  //   loadChildren: () => import('./pages/planner/planner.module').then( m => m.PlannerPageModule)
  // },
  // {
  //   path: '',
  //   component: PageMapPage
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
