import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { MaterialModule } from './material-module';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ListTabContentComponent } from './components/list-tab-content/list-tab-content.component';
import { FilmTabContentComponent } from './components/film-tab-content/film-tab-content.component';
import { ConfigTabContentComponent } from './components/config-tab-content/config-tab-content.component';
import { ListPageComponent } from './components/list-page-component/list-page.component';
import { AllFilmsComponentComponent } from './components/all-films-component/all-films-component.component';
import { RandomFilmComponent } from './components/random-film/random-film.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    TabsComponent,
    ListTabContentComponent,
    FilmTabContentComponent,
    ConfigTabContentComponent,
    ListPageComponent,
    AllFilmsComponentComponent,
    RandomFilmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
