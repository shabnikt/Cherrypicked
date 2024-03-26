import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ListTabContentComponent } from '../list-tab-content/list-tab-content.component';
import { FilmTabContentComponent } from '../film-tab-content/film-tab-content.component';
import { ConfigTabContentComponent } from '../config-tab-content/config-tab-content.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
    @ViewChild(ListTabContentComponent)
    private listTabComponent!: ListTabContentComponent;
    @ViewChild(FilmTabContentComponent)
    private filmTabComponent!: FilmTabContentComponent;
    @ViewChild(ConfigTabContentComponent)
    private configTabComponent!: ConfigTabContentComponent;

  
    onTabChanged(event: MatTabChangeEvent) 
    {
      switch (event.index) {
        case 0:
          this.listTabComponent.getLists();
          break;
        case 1:
          this.filmTabComponent.getFilms();
          break;
        case 2:
          this.configTabComponent.getConfig();
          break;
      }
    }
}
