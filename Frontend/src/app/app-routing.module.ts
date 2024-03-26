import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import { ListPageComponent } from './components/list-page-component/list-page.component';
import { AllFilmsComponentComponent } from './components/all-films-component/all-films-component.component';
import { RandomFilmComponent } from './components/random-film/random-film.component';

const routes: Routes = [{
  path: '', 
  redirectTo: 'filter', 
  pathMatch: 'full'
}, {
  path:'filter',
  component:TabsComponent
}, {
  path:'films',
  component:AllFilmsComponentComponent
}, {
  path:'start',
  component:RandomFilmComponent
}, { 
  path: 'list/:list_id', 
  component: ListPageComponent 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
